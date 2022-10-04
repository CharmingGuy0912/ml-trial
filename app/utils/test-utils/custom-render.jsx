import {ReactLocation, Router} from '@tanstack/react-location'
import {render as testingLibraryRender} from '@testing-library/react'
import PropTypes from 'prop-types'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {HelmetProvider} from 'react-helmet-async'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'

import ActionSubscriptionProvider from '@/components/organisms/ActionSubscription/Provider'
import {history} from '@/configure-store'
import messages from '@/translations/de.json'

// eslint-disable-next-line max-statements
const TestProviders = props => {
  let content = (
    <IntlProvider defaultLocale="de" locale="de" messages={messages}>
      <HelmetProvider>{props.children}</HelmetProvider>
    </IntlProvider>
  )

  if (props.hasRouter) {
    const location = new ReactLocation({history})
    content = (
      <Router routes={props.routes} location={location}>
        {content}
      </Router>
    )
  }

  if (props.actionEmitter) {
    content = (
      <ActionSubscriptionProvider actionEmitter={props.actionEmitter}>
        {content}
      </ActionSubscriptionProvider>
    )
  }

  if (props.hasDndProvider) {
    content = <DndProvider backend={props.dndBackend}>{content}</DndProvider>
  }

  if (props.store) {
    content = <Provider store={props.store}>{content}</Provider>
  }

  return content
}

TestProviders.propTypes = {
  actionEmitter: PropTypes.any,
  children: PropTypes.node.isRequired,
  dndBackend: PropTypes.any,
  hasDndProvider: PropTypes.bool,
  hasRouter: PropTypes.bool,
  routes: PropTypes.array,
  store: PropTypes.shape({dispatch: PropTypes.func.isRequired})
}

TestProviders.defaultProps = {
  actionEmitter: null,
  dndBackend: HTML5Backend,
  hasDndProvider: false,
  hasRouter: false,
  routes: [],
  store: null
}

const render = (ui, options) =>
  testingLibraryRender(ui, {
    // eslint-disable-next-line react/jsx-props-no-spreading
    wrapper: props => <TestProviders {...props} {...options?.wrapperProps} />,
    ...options
  })

export default render
