import path from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { formatError } from 'apollo-errors'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'

import { logger, configureLogger } from '../config/logger'
import config from '../config/index'
import schema from '../schema'

exports.start = function () {
  const app = express()

  let cors_config = {
    origin: true,
    credentials: true,
    allowedHeaders: [
      'content-type',
      'authorization',
      'cookie'
    ]
  }
  logger.debug('Cors configuration is: ', JSON.stringify(cors_config))
  app.use('*', cors(cors_config))

  configureLogger(app)
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json())
  logger.debug('Install middleware bodyParser.urlencoded({ extended: true })')
  app.use(bodyParser.urlencoded({ extended: true }))
  logger.debug('Install middleware cookieParser')
  app.use(cookieParser())

  app.use('/api', bodyParser.json(), graphqlExpress({
    schema: schema,
    formatError: formatError,
    context: {
      // user: wechatUser,
      // token: connectionParams.token,
      // socket: websocket,
      // islogged: true
      app: app
    }
  }))

  app.use('/graphiql', graphiqlExpress({
    endpointURL: config.GRAPHQL_API,
    subscriptionsEndpoint: config.GRAPHIQL_URL
  }))

  app.listen(config.HTTP_PORT, () => {
    logger.info(`Graphql http server is listening at http://${config.HTTP_HOST}:${config.HTTP_PORT}/api`)
    logger.info(`Graphiql query tools is accessable from http://${config.HTTP_HOST}:${config.HTTP_PORT}/graphiql`)
  })

}

