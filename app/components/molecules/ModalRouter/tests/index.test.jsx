import {useMatchRoute} from '@tanstack/react-location'

import ModalRouter from '@/components/molecules/ModalRouter'
import render from '@/utils/test-utils/custom-render'

jest.mock('@tanstack/react-location', () => ({
  ...jest.requireActual('@tanstack/react-location'),
  useMatchRoute: jest.fn(() => () => null)
}))

const children = 'Children'
const element = 'Route Modal'
const defaultProps = {
  base: '/route',
  children: <span>{children}</span>,
  notFound: 'Not Found',
  routes: [
    {
      element: <span>{element}</span>,
      path: 'modal'
    }
  ]
}

const renderComponent = (props = {}) =>
  render(<ModalRouter {...defaultProps} {...props} />)

describe('ModalRouter', () => {
  afterAll(() => {
    jest.unmock('@tanstack/react-location')
  })

  it('should render a not found component if no route matches', () => {
    const {queryByText} = renderComponent()
    expect(queryByText(defaultProps.notFound)).toBeInTheDocument()
    expect(queryByText(children)).not.toBeInTheDocument()
    expect(queryByText(element)).not.toBeInTheDocument()
  })

  it('should render its children if the base path matches strictly', () => {
    useMatchRoute.mockReturnValueOnce(({to}) => to === defaultProps.base)
    const {queryByText} = renderComponent()
    expect(queryByText(children)).toBeInTheDocument()
    expect(queryByText(defaultProps.notFound)).not.toBeInTheDocument()
    expect(queryByText(element)).not.toBeInTheDocument()
  })

  it('should render its children and the matching routes element, if a route matches', () => {
    useMatchRoute.mockReturnValue(
      ({to}) => to === `${defaultProps.base}/${defaultProps.routes[0].path}`
    )
    const {queryByText} = renderComponent()
    expect(queryByText(element)).toBeInTheDocument()
    expect(queryByText(children)).toBeInTheDocument()
    expect(queryByText(defaultProps.notFound)).not.toBeInTheDocument()
    useMatchRoute.mockReturnValue(() => null)
  })
})
