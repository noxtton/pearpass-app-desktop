#!/usr/bin/env node

// Native messaging host - bridges browser extension to PearPass desktop app via IPC

import { NativeMessagingHandler } from '../nativeMessaging/nativeMessagingHandler'
import IPC from 'pear-ipc'
import { tmpdir } from 'os'
import { join } from 'path'
import { COMMAND_DEFINITIONS, isValidCommand } from '../shared/commandDefinitions'
import { log } from '../utils/nativeMessagingLogger'

// Desktop app status constants
const DESKTOP_APP_STATUS = Object.freeze({
  CONNECTED: 'connected',
  NOT_RUNNING: 'not-running',
  INTEGRATION_DISABLED: 'integration-disabled',
  CONNECTING: 'connecting',
  UNKNOWN: 'unknown'
})

// Timeout constants (in milliseconds)
const TIMEOUTS = Object.freeze({
  IPC_CONNECTION: 5000,      // 3 seconds to establish IPC connection
  IPC_CALL: 10000,          // 3 seconds for IPC method calls
})

// User-friendly error messages for each status
const STATUS_MESSAGES = Object.freeze({
  [DESKTOP_APP_STATUS.NOT_RUNNING]: 'PearPass desktop app is not running',
  [DESKTOP_APP_STATUS.INTEGRATION_DISABLED]: 'Browser extension integration is disabled in PearPass desktop app. Please enable it in Settings > Privacy',
  [DESKTOP_APP_STATUS.CONNECTING]: 'Connecting to PearPass desktop app...',
  [DESKTOP_APP_STATUS.UNKNOWN]: 'Unable to connect to PearPass desktop app'
})

class NativeMessagingHost {
  constructor() {
    this.handler = new NativeMessagingHandler()
    this.ipcClient = null
    this.isRunning = false
    this.socketPath = join(tmpdir(), 'pearpass-native-messaging.sock')
    this.desktopAppStatus = DESKTOP_APP_STATUS.UNKNOWN
    this.lastConnectionError = null
  }

  async start() {
    if (this.isRunning) {
      return;
    }

    try {
      log("IPC-BRIDGE", "INFO", 'Starting simple native messaging host...');
      
      // Set up native messaging handler first
      this.handler.on('message', async (message) => {
        log("IPC-BRIDGE", "INFO", 'Received message from extension: ' + JSON.stringify(message));
        await this.handleMessage(message);
      });

      this.handler.on('disconnect', () => {
        log("IPC-BRIDGE", "INFO", 'Native messaging disconnected');
        this.stop();
      });

      this.handler.on('error', (error) => {
        log("IPC-BRIDGE", "INFO", 'Native messaging handler error: ' + error.message);
        if (error.stack) {
          log("IPC-BRIDGE", "INFO", 'Error stack: ' + error.stack);
        }
        if (error.invalidMessage) {
          log("IPC-BRIDGE", "INFO", 'Invalid message data: ' + JSON.stringify(error.invalidMessage));
        }
        this.stop();
      });

      // Start the native messaging handler
      this.handler.start();
      this.isRunning = true;

      log("IPC-BRIDGE", "INFO", 'Simple native messaging host started, attempting IPC connection...');
      
      // Try to connect to IPC server (non-blocking)
      this.connectToIPC().catch(error => {
        log("IPC-BRIDGE", "INFO", 'Initial IPC connection failed: ' + error.message);
        this.updateDesktopAppStatus(error);
      });

    } catch (error) {
      log("IPC-BRIDGE", "INFO", 'Failed to start simple native messaging host: ' + error.message);
      throw error;
    }
  }

  /**
   * Connect to the IPC server
   * Update desktop app status based on success or failure
   */
  async connectToIPC() {
    try {
      this.desktopAppStatus = DESKTOP_APP_STATUS.CONNECTING;
      log("IPC-BRIDGE", "INFO", `Attempting to connect to IPC server at: ${this.socketPath}`);

      // Create new IPC client connection
      this.ipcClient = new IPC.Client({
        socketPath: this.socketPath,
        connect: true,
        connectTimeout: TIMEOUTS.IPC_CONNECTION,
        methods: COMMAND_DEFINITIONS
      });

      // Wait for connection with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Connection timed out'));
        }, TIMEOUTS.IPC_CONNECTION);
      });

      await Promise.race([
        this.ipcClient.ready(),
        timeoutPromise
      ]);
      
      log("IPC-BRIDGE", "INFO", 'Successfully connected to IPC server');

      // Update status
      this.desktopAppStatus = DESKTOP_APP_STATUS.CONNECTED;
      
      // Set up disconnect handler
      this.ipcClient.on('close', () => {
        log("IPC-BRIDGE", "INFO", 'IPC client disconnected');
        this.desktopAppStatus = DESKTOP_APP_STATUS.NOT_RUNNING;
        this.ipcClient = null;
      });
    } catch (error) {
      log("IPC-BRIDGE", "INFO", `Failed to connect to IPC server: ${error.message}`);
      this.updateDesktopAppStatus(error);
      
      // Clean up client on failure
      if (this.ipcClient) {
        try {
          this.ipcClient.close();
        } catch (e) {
          // Ignore close errors
        }
        this.ipcClient = null;
      }
    }
  }

  /**
   * Update desktop app status based on connection error
   * @param {Error} error - Connection error
   */
  updateDesktopAppStatus(error) {
    if (error.message.includes('ENOENT')) {
      this.desktopAppStatus = DESKTOP_APP_STATUS.NOT_RUNNING;
    } else {
      this.desktopAppStatus = DESKTOP_APP_STATUS.INTEGRATION_DISABLED;
    }
    this.lastConnectionError = error.message;
  }

  async handleMessage(message) {
    const { id, method, command, params } = message;
    const methodName = method || command;

    try {
      // Remove any padding added to work around Chrome 255-byte bug
      const cleanParams = params ? { ...params } : {};
      delete cleanParams._padding;
      
      log("IPC-BRIDGE", "INFO", `Processing request: ${methodName} with params: ${JSON.stringify(cleanParams)}`);
      
      // Handle special checkAvailability command
      if (methodName === 'checkAvailability') {
        // Always try to connect when checking availability
        if (this.desktopAppStatus !== DESKTOP_APP_STATUS.CONNECTED) {
          log("IPC-BRIDGE", "INFO", 'Checking availability - attempting to connect...');
          try {
            await this.connectToIPC();
          } catch (connectError) {
            log("IPC-BRIDGE", "INFO", `Availability check - connection failed: ${connectError.message}`);
          }
        }
        
        const response = {
          id,
          success: true,
          result: {
            available: this.desktopAppStatus === DESKTOP_APP_STATUS.CONNECTED,
            status: this.desktopAppStatus,
            message: STATUS_MESSAGES[this.desktopAppStatus] || STATUS_MESSAGES[DESKTOP_APP_STATUS.UNKNOWN]
          }
        };
        this.handler.send(response);
        log("IPC-BRIDGE", "INFO", `Sent availability check response: ${JSON.stringify(response)}`);
        return;
      }
      
      // For all other commands, check if desktop app is available
      if (this.desktopAppStatus !== DESKTOP_APP_STATUS.CONNECTED) {
        // Try to reconnect first
        log("IPC-BRIDGE", "INFO", 'Desktop app not connected, attempting to connect...');
        try {
          await this.connectToIPC();
        } catch (connectError) {
          log("IPC-BRIDGE", "INFO", `Failed to connect: ${connectError.message}`);
        }
        
        // Check again after connection attempt
        if (this.desktopAppStatus !== DESKTOP_APP_STATUS.CONNECTED) {
          const errorMessage = STATUS_MESSAGES[this.desktopAppStatus] || STATUS_MESSAGES[DESKTOP_APP_STATUS.UNKNOWN];
          this.handler.send({
            id,
            success: false,
            error: errorMessage,
            errorCode: this.desktopAppStatus
          });
          log("IPC-BRIDGE", "INFO", `Sent error response: ${errorMessage}`);
          return;
        }
      }
      
      // Check if IPC client is still connected
      if (!this.ipcClient || this.ipcClient.closed) {
        log("IPC-BRIDGE", "INFO", 'IPC client is not connected, attempting to reconnect...');
        await this.reconnectIPC();
      }
      
      let result = null;
      
      // Call the appropriate method on the IPC client with timeout
      if (isValidCommand(methodName) && this.ipcClient[methodName]) {
        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error(`IPC call timed out after ${TIMEOUTS.IPC_CALL / 1000} seconds`));
          }, TIMEOUTS.IPC_CALL);
        });
        
        try {
          // Race between the IPC call and timeout
          result = await Promise.race([
            this.ipcClient[methodName](cleanParams),
            timeoutPromise
          ]);
        } catch (error) {
          // If it's a timeout or connection error, update status
          if (error.message.includes('timed out') || error.message.includes('RPC destroyed')) {
            log("IPC-BRIDGE", "INFO", 'IPC call failed, desktop app may have been closed');
            this.desktopAppStatus = DESKTOP_APP_STATUS.NOT_RUNNING;
            this.ipcClient = null;
          }
          throw error;
        }
      } else {
        throw new Error(`Unknown method: ${methodName}`);
      }
      
      // Send success response
      this.handler.send({
        id,
        success: true,
        result
      });
      
      log("IPC-BRIDGE", "INFO", `Sent response for ${methodName}: ${JSON.stringify(result)}`);
    } catch (error) {
      log("IPC-BRIDGE", "INFO", `Error handling message: ${error.message}`);
      
      // If it's an RPC destroyed error, try to reconnect
      if (error.message.includes('RPC destroyed')) {
        log("IPC-BRIDGE", "INFO", 'RPC destroyed detected, attempting to reconnect...');
        try {
          await this.reconnectIPC();
          // Retry the message after reconnection
          return this.handleMessage(message);
        } catch (reconnectError) {
          log("IPC-BRIDGE", "INFO", `Failed to reconnect: ${reconnectError.message}`);
          this.updateDesktopAppStatus(reconnectError);
        }
      }
      
      // Send error response
      this.handler.send({
        id,
        success: false,
        error: error.message
      });
    }
  }

  async reconnectIPC() {
    try {
      // Close existing client if any
      if (this.ipcClient) {
        try {
          this.ipcClient.close();
        } catch (e) {
          // Ignore close errors
        }
        this.ipcClient = null;
      }
      
      // Use connectToIPC which handles status updates
      await this.connectToIPC();
      
      if (this.desktopAppStatus !== DESKTOP_APP_STATUS.CONNECTED) {
        throw new Error(STATUS_MESSAGES[this.desktopAppStatus]);
      }
    } catch (error) {
      log("IPC-BRIDGE", "INFO", `Failed to reconnect to IPC server: ${error.message}`);
      throw error;
    }
  }
  
  stop() {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;

    if (this.ipcClient) {
      this.ipcClient.close();
      this.ipcClient = null;
    }

    if (this.handler) {
      this.handler.stop();
    }

    log("IPC-BRIDGE", "INFO", 'Simple native messaging host stopped');
  }
}

// Log early to verify logging works
log("IPC-BRIDGE", "INFO", 'Native messaging host script started');

// Create and start the host
const host = new NativeMessagingHost();

// Graceful shutdown
process.on('SIGINT', () => {
  host.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  host.stop();
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  log("IPC-BRIDGE", "INFO", 'Uncaught exception: ' + error.message);
  log("IPC-BRIDGE", "INFO", 'Stack trace: ' + error.stack);
  host.stop();
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log("IPC-BRIDGE", "INFO", 'Unhandled rejection at: ' + promise + ' reason: ' + reason);
  host.stop();
  process.exit(1);
});

// Start the host
log("IPC-BRIDGE", "INFO", 'About to start host...');
host.start().catch((error) => {
  log("IPC-BRIDGE", "INFO", 'Failed to start host: ' + error.message);
  log("IPC-BRIDGE", "INFO", 'Stack trace: ' + error.stack);
  process.exit(1);
});
