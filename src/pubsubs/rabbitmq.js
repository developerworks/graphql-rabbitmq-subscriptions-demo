import { AmqpPubSub } from 'graphql-rabbitmq-subscriptions'
import config from '../config/index'
import { logger } from '../utils/logger'
export const pubsub = new AmqpPubSub({
  config: {
    host: config.RABBITMQ_HOST,
    port: config.RABBITMQ_PORT,
  },
  connectionListener: (err) => {
    console.log('connect to rabbitmq', err)
  },
  logger: logger
})
