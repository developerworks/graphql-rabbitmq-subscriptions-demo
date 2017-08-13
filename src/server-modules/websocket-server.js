import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { logger } from '../config/logger'
import config from '../config/index'
import schema from '../schema'

exports.start = function() {
  const websocketServer = createServer((req, res) => {
    res.writeHead(404)
    res.end()
  })
  websocketServer.listen(config.WS_PORT, () => {
    logger.info(`Graphql websocket server is listening on ws://${config.WS_HOST}:${config.WS_PORT}`)
  })

  const subscriptionServer = SubscriptionServer.create({
    schema: schema,
    execute: execute,
    subscribe: subscribe,
    keepAlive: 30000
  }, { server: websocketServer, path: '/ws' })
}
