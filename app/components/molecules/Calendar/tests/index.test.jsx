import {fireEvent} from '@testing-library/react'
import de from 'date-fns/locale/de'

import {CALENDAR_MODULE_ID} from '@/components/pages/TrainingPlan/constants'
import EventResultsInjector from '@/injectors/event/ResultsInjector'
import {actions} from '@/modules/event/results'
import EVENT_TYPES from '@/modules/event/results/types'
import configureTestStore from '@/utils/test-utils/configure-test-store'
import render from '@/utils/test-utils/custom-render'
import renderInjectors from '@/utils/test-utils/render-injectors'
import setEntities from '@/utils/test-utils/set-entities'

import Calendar from '../index'
import messages from '../messages'

const {clearDispatch, options, store} = configureTestStore()
const renderComponent = (props, renderFn = render) =>
  renderFn(<Calendar value={new Date(2022, 2, 7)} {...props} />, options)

const event = {
  id: 'event-id-1',
  startedAt: new Date(2022, 3, 7).toISOString(),
  title: 'Tournament Title',
  type: EVENT_TYPES.TOURNAMENT
}

describe('Calendar', () => {
  beforeAll(() => {
    renderInjectors(<EventResultsInjector />, options)
    jest.useFakeTimers().setSystemTime(new Date(2022, 3, 7).getTime())
    setEntities(store, {
      events: {[event.id]: event}
    })
  })

  beforeEach(clearDispatch)

  it('should match the snapshot', () => {
    const {container} = renderComponent({value: new Date(2022, 3, 7)})
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should match the snapshot if there are events available', () => {
    store.dispatch(
      actions.load.fulfilled({
        id: CALENDAR_MODULE_ID,
        result: [event.id],
        total: 1
      })
    )
    const {container} = renderComponent({value: new Date(2022, 3, 7)})
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should update synced value and displayed month on value prop change', () => {
    const {getByLabelText, getByText, rerender} = renderComponent()
    renderComponent({value: new Date(2022, 1, 14)}, rerender)
    const monthSelect = getByLabelText(messages.selectMonth.defaultMessage)
    const dayButton = getByText('14').parentElement
    expect(monthSelect.previousElementSibling.textContent).toBe(
      de.localize.month(1)
    )
    expect(dayButton).toHaveClass('specific:bg-primary')
  })

  it('should display current month if no value provided', () => {
    const {getByLabelText} = renderComponent({value: null})
    const monthSelect = getByLabelText(messages.selectMonth.defaultMessage)
    expect(monthSelect.previousElementSibling.textContent).toBe(
      de.localize.month(3)
    )
  })

  describe('events', () => {
    it('should change month on prev button click', () => {
      const {getByLabelText} = renderComponent()
      const prev = getByLabelText(messages.prevMonth.defaultMessage)
      const monthSelect = getByLabelText(messages.selectMonth.defaultMessage)
      expect(monthSelect.previousElementSibling.textContent).toBe(
        de.localize.month(2)
      )
      fireEvent.click(prev)
      expect(monthSelect.previousElementSibling.textContent).toBe(
        de.localize.month(1)
      )
    })

    it('should change month on next button click', () => {
      const {getByLabelText} = renderComponent()
      const next = getByLabelText(messages.nextMonth.defaultMessage)
      const monthSelect = getByLabelText(messages.selectMonth.defaultMessage)
      expect(monthSelect.previousElementSibling.textContent).toBe(
        de.localize.month(2)
      )
      fireEvent.click(next)
      expect(monthSelect.previousElementSibling.textContent).toBe(
        de.localize.month(3)
      )
    })

    it('should change month on month select', () => {
      const {getByLabelText, getByText} = renderComponent()
      const monthSelect = getByLabelText(messages.selectMonth.defaultMessage)
      expect(monthSelect.previousElementSibling.textContent).toBe(
        de.localize.month(2)
      )
      fireEvent.keyDown(monthSelect, {key: 'ArrowDown'})
      fireEvent.click(getByText(de.localize.month(10)))
      expect(monthSelect.previousElementSibling.textContent).toBe(
        de.localize.month(10)
      )
    })

    it('should change year on year select', () => {
      const {getByLabelText, getByText} = renderComponent()
      const yearSelect = getByLabelText(messages.selectYear.defaultMessage)
      expect(yearSelect.previousElementSibling.textContent).toBe('2022')
      fireEvent.keyDown(yearSelect, {key: 'ArrowDown'})
      fireEvent.click(getByText('2000'))
      expect(yearSelect.previousElementSibling.textContent).toBe('2000')
    })
  })
})
