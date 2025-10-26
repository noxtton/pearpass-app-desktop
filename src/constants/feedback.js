import 'dotenv/config'

const isDev = !Pear.config.key

export const SLACK_WEBHOOK_URL_PATH = isDev
  ? process.env.TEST_SLACK_WEBHOOK_URL_PATH
  : process.env.SLACK_WEBHOOK_URL_PATH

export const GOOGLE_FORM_KEY = isDev
  ? process.env.TEST_GOOGLE_FORM_KEY
  : process.env.GOOGLE_FORM_KEY

export const GOOGLE_FORM_MAPPING = isDev
  ? {
      timestamp: process.env.TEST_GOOGLE_FORM_MAPPING_TIMESTAMP,
      topic: process.env.TEST_GOOGLE_FORM_MAPPING_TOPIC,
      app: process.env.TEST_GOOGLE_FORM_MAPPING_APP,
      operatingSystem: process.env.TEST_GOOGLE_FORM_MAPPING_OPERATING_SYSTEM,
      deviceModel: process.env.TEST_GOOGLE_FORM_MAPPING_DEVICE_MODEL,
      message: process.env.TEST_GOOGLE_FORM_MAPPING_MESSAGE,
      appVersion: process.env.TEST_GOOGLE_FORM_MAPPING_APP_VERSION
    }
  : {
      timestamp: process.env.GOOGLE_FORM_MAPPING_TIMESTAMP,
      topic: process.env.GOOGLE_FORM_MAPPING_TOPIC,
      app: process.env.GOOGLE_FORM_MAPPING_APP,
      operatingSystem: process.env.GOOGLE_FORM_MAPPING_OPERATING_SYSTEM,
      deviceModel: process.env.GOOGLE_FORM_MAPPING_DEVICE_MODEL,
      message: process.env.GOOGLE_FORM_MAPPING_MESSAGE,
      appVersion: process.env.GOOGLE_FORM_MAPPING_APP_VERSION
    }
