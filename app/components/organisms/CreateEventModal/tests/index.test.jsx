import {useMatchRoute} from '@tanstack/react-location'
import {fireEvent} from '@testing-library/react'
import {goBack} from 'redux-first-history'

import commonMessages from '@/components/common-messages'
import RoutedModalProvider from '@/components/organisms/RoutedModal/Provider'
import EventTypeMatch from '@/contexts/EventType/EventTypeMatch'
import EVENT_TYPES from '@/modules/event/results/types'
import configureTestStore from '@/utils/test-utils/configure-test-store'
import render from '@/utils/test-utils/custom-render'

import CreateEventModal from '../index'
import messages from '../messages'

jest.mock('@tanstack/react-location', () => ({
  ...jest.requireActual('@tanstack/react-location'),
  useMatchRoute: jest.fn(() => () => ({})),
  useNavigate: jest.fn(() => {}),
  useSearch: jest.fn(() => ({}))
}))

jest.mock('@/components/atoms/Modal', () => props => {
  if (props.isOpen) {
    return (
      <div ref={props.setReference}>
        {props.header}
        {props.children}
        {props.footerSlot}
        {props.footer}
      </div>
    )
  }
  return null
})

const {clearDispatch, store, options} = configureTestStore()
const renderComponent = (renderFn = render) =>
  renderFn(
    <RoutedModalProvider>
      <EventTypeMatch match="">
        <CreateEventModal />
      </EventTypeMatch>
    </RoutedModalProvider>,
    options
  )

describe('CreateEventModal', () => {
  afterAll(() => {
    jest.unmock('@tanstack/react-location')
  })

  beforeEach(clearDispatch)

  it('should render nothing, if there is no type param', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toBeNull()
  })

  it('should render a modal if a valid type is provided', () => {
    useMatchRoute.mockReturnValueOnce(() => ({type: EVENT_TYPES.TRAINING}))
    const {getByText} = renderComponent()
    expect(getByText(messages.title.defaultMessage)).toBeInTheDocument()
  })

  it('should navigate back if closed', () => {
    useMatchRoute.mockReturnValueOnce(() => ({type: EVENT_TYPES.TRAINING}))
    const {queryByText} = renderComponent()
    fireEvent.click(queryByText(commonMessages.cancel.defaultMessage))
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(goBack())
    expect(
      queryByText(commonMessages.cancel.defaultMessage)
    ).not.toBeInTheDocument()
  })
})
