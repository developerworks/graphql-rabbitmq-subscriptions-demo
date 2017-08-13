import { PubSub, withFilter } from 'graphql-subscriptions';
// JSON 标量类型
import GraphQLJSON from 'graphql-type-json'
import channels from './channels'
import { logger } from './config/logger'
import { pubsub } from './pubsubs/rabbitmq'

const resolveFunctions = {
  Query: {
    getUser(_, { user }, context, info) {
      return user
    }
  },
  Mutation: {
    modifyUser(_, { user }, context, info) {
      pubsub.publish(channels.ON_USER_MODIFIED, { userModified: user });
      return user
    }
  },
  Subscription: {
    userModified: {
      // subscribe: () => pubsub.asyncIterator(channels.ON_USER_MODIFIED)
      subscribe: withFilter(() => pubsub.asyncIterator(channels.ON_USER_MODIFIED), (payload, variables, context, info) => {
        // return payload.onWechatUserLogin.uuid === variables.uuid
        return true
      })
    }
  },
  JSON: GraphQLJSON
}

export default resolveFunctions
