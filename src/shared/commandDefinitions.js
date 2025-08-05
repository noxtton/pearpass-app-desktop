/**
 * Centralized command definitions for the Pearpass native messaging system.
 * This file serves as the single source of truth for all command names and IDs.
 * Import this file wherever command definitions are needed.
 */

/**
 * @typedef {Object} CommandDefinition
 * @property {number} id - Unique command ID
 * @property {string} name - Command name
 */

// Define all available commands with their IDs
// Using IDs starting from 1000 to avoid conflicts with internal pear-ipc methods
/** @type {CommandDefinition[]} */
export const COMMAND_DEFINITIONS = [
  // Encryption commands
  { id: 1001, name: 'encryptionInit' },
  { id: 1002, name: 'encryptionGetStatus' },
  { id: 1003, name: 'encryptionGet' },
  { id: 1004, name: 'encryptionAdd' },

  // Vaults commands
  { id: 1005, name: 'vaultsInit' },
  { id: 1006, name: 'vaultsGetStatus' },
  { id: 1007, name: 'vaultsGet' },
  { id: 1008, name: 'vaultsList' },
  { id: 1009, name: 'vaultsAdd' },
  { id: 1010, name: 'vaultsClose' },

  // Active vault commands
  { id: 1011, name: 'activeVaultInit' },
  { id: 1012, name: 'activeVaultGetStatus' },
  { id: 1013, name: 'activeVaultGet' },
  { id: 1014, name: 'activeVaultList' },
  { id: 1015, name: 'activeVaultAdd' },
  { id: 1016, name: 'activeVaultRemove' },
  { id: 1017, name: 'activeVaultClose' },
  { id: 1018, name: 'activeVaultCreateInvite' },
  { id: 1019, name: 'activeVaultDeleteInvite' },

  // Password and encryption key commands
  { id: 1020, name: 'hashPassword' },
  { id: 1021, name: 'encryptVaultKeyWithHashedPassword' },
  { id: 1022, name: 'encryptVaultWithKey' },
  { id: 1023, name: 'getDecryptionKey' },
  { id: 1024, name: 'decryptVaultKey' },

  // Pairing and misc commands
  { id: 1025, name: 'pair' },
  { id: 1026, name: 'initListener' },
  { id: 1027, name: 'closeVault' }
]

// Export just the method names array for simpler usage
/** @type {string[]} */
export const COMMAND_NAMES = COMMAND_DEFINITIONS.map((cmd) => cmd.name)

// Export a map for quick lookup by name
/** @type {Object.<string, CommandDefinition>} */
export const COMMAND_BY_NAME = COMMAND_DEFINITIONS.reduce((acc, cmd) => {
  acc[cmd.name] = cmd
  return acc
}, {})

// Export a map for quick lookup by ID
/** @type {Object.<number, CommandDefinition>} */
export const COMMAND_BY_ID = COMMAND_DEFINITIONS.reduce((acc, cmd) => {
  acc[cmd.id] = cmd
  return acc
}, {})

// Special command mappings (currently none, but keeping structure for future use)
/** @type {Object.<string, string>} */
export const COMMAND_ALIASES = {}

/**
 * Get the normalized command name, handling aliases
 * @param {string} commandName - The command name to normalize
 * @returns {string} The normalized command name
 */
export function normalizeCommandName(commandName) {
  return COMMAND_ALIASES[commandName] || commandName
}

/**
 * Check if a command is valid
 * @param {string} commandName - The command name to check
 * @returns {boolean} True if the command is valid
 */
export function isValidCommand(commandName) {
  const normalized = normalizeCommandName(commandName)
  return COMMAND_NAMES.includes(normalized)
}
