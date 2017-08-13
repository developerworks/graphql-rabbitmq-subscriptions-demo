if (process.env.NODE_ENV === 'production') {
  const config = require('./remote')
  module.exports = config
} else {
  const config = require('./local')
  module.exports = config
}
