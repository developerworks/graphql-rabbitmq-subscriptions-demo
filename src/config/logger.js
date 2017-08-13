import path from 'path'
import log4js from 'log4js'
import express from 'express'

log4js.configure({
  pm2: false,

  appenders: {
    // 标准输出
    console: {
      type: 'console',
      pattern: '_yyyy-MM-dd'
    },
    // 文件: 所有级别
    file: {
      type: 'dateFile',
      filename: path.resolve(__dirname, '../../logs/default.log'),
      pattern: '.yyyy-MM-dd-hh',
      category: 'default'
    },
    // 按时间滚动: 只记录错误
    errors: {
      type: "dateFile",
      filename: path.resolve(__dirname, '../../logs/errors.log'),
      pattern: '.yyyy-MM-dd-hh',
      category: 'default'
    },
    // 日志级别过滤, 记录到 errors 文件中
    onlyerrors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errors'
    }
  },
  categories: { default: { appenders: ['console', 'file', 'onlyerrors'], level: 'error' } }
});

let logger = log4js.getLogger('default')
logger.level = 'debug';

let account_logger = log4js.getLogger('account')
account_logger.level = 'debug'

exports.logger = logger
exports.account_logger = account_logger

exports.configureLogger = (app) => {
  app.use(log4js.connectLogger(logger, {
    level: log4js.levels.INFO
  }))
  const router = express.Router()
  app.use(router)
}
