import {fireEvent, waitFor} from '@testing-library/react'

import dateFieldFrameMessages from '@/components/atoms/DateFieldFrame/messages'
import EventResultsInjector from '@/injectors/event/ResultsInjector'
import EVENT_TYPES from '@/modules/event/results/types'
import configureTestStore from '@/utils/test-utils/configure-test-store'
import render from '@/utils/test-utils/custom-render'
import renderInjectors from '@/utils/test-utils/render-injectors'
import setEntities from '@/utils/test-utils/set-entities'

import DateCyclePicker from '../index'
import messages from '../messages'

const getEventsForDate = ({date}) => [
  {
    id: 'event-1',
    startDate: date,
    title: 'the title',
    type: EVENT_TYPES.TRAINING
  }
]

const {clearDispatch, options, store} = configureTestStore()
const renderComponent = (props, renderFn = render) =>
  renderFn(
    <DateCyclePicker
      getEventsForDate={getEventsForDate}
      value={new Date(1)}
      {...props}
    />,
    options
  )

const event = {
  id: 'event-id-1',
  startedAt: new Date(2022, 3, 7).toISOString(),
  title: 'Tournament Title',
  type: EVENT_TYPES.TOURNAMENT
}

describe('DateCyclePicker', () => {
  beforeAll(() => {
    renderInjectors(<EventResultsInjector />, options)
    setEntities(store, {
      events: {[event.id]: event}
    })
  })

  beforeEach(clearDispatch)

  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should display range from start to end of week', () => {
    const {getByLabelText} = renderComponent({value: new Date(2022, 2, 8)})
    const from = getByLabelText(messages.from.defaultMessage)
    const to = getByLabelText(messages.to.defaultMessage)
    expect(from.value).toBe('07.03.2022')
    expect(to.value).toBe('13.03.2022')
  })

  it('should not break on invalid date', () => {
    const {getByLabelText} = renderComponent({value: new Date('foo')})
    const from = getByLabelText(messages.from.defaultMessage)
    const to = getByLabelText(messages.to.defaultMessage)
    expect(from.value).toBe('')
    expect(to.value).toBe('')
  })

  describe('events', () => {
    it('should call onChange prop on input change', () => {
      const onChange = jest.fn()
      const {getByLabelText} = renderComponent({onChange})
      const from = getByLabelText(messages.from.defaultMessage)
      fireEvent.change(from, {target: {value: '08.03.2022'}})
      fireEvent.blur(from)
      expect(onChange).toHaveBeenCalledWith(new Date(2022, 2, 7))
    })

    it('should call onChange prop on input change even if date stayed the same', () => {
      const onChange = jest.fn()
      const {getByLabelText} = renderComponent({
        onChange,
        value: new Date(2022, 2, 7)
      })
      const from = getByLabelText(messages.from.defaultMessage)
      fireEvent.change(from, {target: {value: '08.03.2022'}})
      fireEvent.blur(from)
      expect(onChange).toHaveBeenCalledWith(new Date(2022, 2, 7))
    })

    it('should change active state on focus', () => {
      const {container, getByLabelText} = renderComponent()
      const from = getByLabelText(messages.from.defaultMessage)
      fireEvent.focus(from)
      expect(container.firstChild.firstChild).toHaveClass('specific:bg-white')
    })

    it('should subtract one week on prev button click', () => {
      const onChange = jest.fn()
      const {getByLabelText} = renderComponent({
        onChange,
        value: new Date(2022, 2, 7)
      })
      const prev = getByLabelText(messages.prev.defaultMessage)
      fireEvent.click(prev)
      expect(onChange).toHaveBeenCalledWith(new Date(2022, 1, 28))
    })

    it('should add one week on next button click', () => {
      const onChange = jest.fn()
      const {getByLabelText} = renderComponent({
        onChange,
        value: new Date(2022, 2, 7)
      })
      const next = getByLabelText(messages.next.defaultMessage)
      fireEvent.click(next)
      expect(onChange).toHaveBeenCalledWith(new Date(2022, 2, 14))
    })

    it('should toggle picker on toggle button click', async () => {
      const {getByLabelText, queryByRole} = renderComponent()
      const toggle = getByLabelText(
        dateFieldFrameMessages.toggle.defaultMessage
      )
      fireEvent.click(toggle)
      expect(queryByRole('dialog')).toBeInTheDocument()
      fireEvent.click(toggle)
      await waitFor(() => expect(queryByRole('dialog')).not.toBeInTheDocument())
    })

    it('should close picker popup on Escape key down', async () => {
      const {container, getByLabelText, queryByRole} = renderComponent()
      const toggle = getByLabelText(
        dateFieldFrameMessages.toggle.defaultMessage
      )
      fireEvent.click(toggle)
      expect(queryByRole('dialog')).toBeInTheDocument()
      fireEvent.keyDown(container.firstChild, {key: 'Escape'})
      await waitFor(() => expect(queryByRole('dialog')).not.toBeInTheDocument())
    })
  })
})
