import {render as testingLibraryRender} from '@testing-library/react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'

import EntitiesInjector from '@/injectors/entities/EntitiesInjector'

const TestProviders = ({children, store}) => (
  <Provider store={store}>
    <EntitiesInjector />
    {children}
  </Provider>
)

TestProviders.propTypes = {
  children: PropTypes.node,
  store: PropTypes.shape({dispatch: PropTypes.func.isRequired}).isRequired
}

TestProviders.defaultProps = {
  children: null
}

/* eslint-disable react/display-name, react/jsx-props-no-spreading */
const renderInjectors = (ui, options) =>
  testingLibraryRender(ui, {
    wrapper: props => <TestProviders {...props} {...options?.wrapperProps} />,
    ...options
  })
/* eslint-enable */

export default renderInjectors
