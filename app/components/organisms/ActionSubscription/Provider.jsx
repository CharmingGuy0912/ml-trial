import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React from 'react'

import ActionSubscriptionContext from './context'

class ActionSubscriptionProvider extends React.Component {
  constructor(props) {
    super(props)

    this.subscribers = {}
  }

  componentDidMount() {
    this.props.actionEmitter.setSubscriber(this.subscription)
  }

  componentWillUnmount() {
    this.props.actionEmitter.unsubscribe()
  }

  subscription = (actionType, actionPayload) => {
    const {[actionType]: subscribers = {}} = this.subscribers
    Object.values(subscribers).forEach(subscriber => subscriber(actionPayload))
  }

  addSubscriber = (actionType, subscriber, id) => {
    const {[actionType]: existingSubscribers = {}} = this.subscribers
    this.subscribers[actionType] = {
      ...existingSubscribers,
      [id]: subscriber
    }
  }

  removeSubscriber = (actionType, identifier) => {
    if (this.subscribers[actionType]) {
      delete this.subscribers[actionType][identifier]
      if (isEmpty(this.subscribers[actionType])) {
        delete this.subscribers[actionType]
      }
    }
  }

  render() {
    const {addSubscriber, removeSubscriber} = this
    return (
      <ActionSubscriptionContext.Provider
        value={{
          addSubscriber,
          removeSubscriber
        }}
      >
        {this.props.children}
      </ActionSubscriptionContext.Provider>
    )
  }
}

ActionSubscriptionProvider.propTypes = {
  actionEmitter: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export default ActionSubscriptionProvider
