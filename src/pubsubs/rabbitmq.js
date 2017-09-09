import { AmqpPubSub } from 'graphql-rabbitmq-subscriptions'
import config from '../config/index'
import { logger } from '../config/logger'

var server = require("@cdm-logger/server");
var settings = {
  level: "info",
  mode: "short" // Optional: default 'short' ('short'|'long'|'dev'|'raw')
};
var cdmlogger = server.ConsoleLogger.create("pubsub", settings);
cdmlogger.level('trace')


export const pubsub = new AmqpPubSub({
  config: {
    host: config.RABBITMQ_HOST,
    port: config.RABBITMQ_PORT,
  },
  connectionListener: (err) => {
    if (err) {
      logger.error('connect to rabbitmq error ', err)
    } else {
      logger.info('connected to rabbitmq')
    }
  },
  logger: cdmlogger
})
