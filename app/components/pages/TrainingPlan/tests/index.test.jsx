import {act} from '@testing-library/react'

import ToastContainer from '@/components/atoms/ToastContainer'
import {TRAINING_PLAN_MODULE_ID} from '@/components/pages/TrainingPlan/constants'
import EntitiesInjector from '@/injectors/entities/EntitiesInjector'
import EventResultsInjector from '@/injectors/event/ResultsInjector'
import {actions} from '@/modules/event/results'
import EVENT_TYPES from '@/modules/event/results/types'
import configureTestStore from '@/utils/test-utils/configure-test-store'
import render from '@/utils/test-utils/custom-render'
import renderInjectors from '@/utils/test-utils/render-injectors'
import setEntities from '@/utils/test-utils/set-entities'

import TrainingPlan from '../index'

jest.mock('@tanstack/react-location', () => ({
  ...jest.requireActual('@tanstack/react-location'),
  useNavigate: jest.fn(() => {})
}))
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  startOfWeek: jest.fn(() => new Date('2022/01/31 08:00:00'))
}))
jest.mock('@/components/molecules/ModalRouter')

const {clearDispatch, options, store} = configureTestStore({
  withActionSubscription: true
})
const renderComponent = (renderFn = render) =>
  renderFn(
    <>
      <ToastContainer />
      <TrainingPlan />
    </>,
    {
      ...options,
      wrapperProps: {
        hasDndProvider: true,
        hasRouter: true,
        ...options.wrapperProps
      }
    }
  )

const event = {
  id: 'event-id-1',
  startedAt: new Date('2022-01-31 08:00:00').toISOString(),
  title: 'Event Title',
  type: EVENT_TYPES.OTHER
}

const dispatchResult = ({result = [event.id], total = 1}) => {
  act(() => {
    store.dispatch(
      actions.load.fulfilled({
        id: TRAINING_PLAN_MODULE_ID,
        result,
        total
      })
    )
  })
}

describe('TrainingPlan', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022/01/31').getTime())
    renderInjectors(
      <>
        <EventResultsInjector />
        <EntitiesInjector />
      </>,
      options
    )
    setEntities(store, {
      events: {
        [event.id]: event
      }
    })
  })

  beforeEach(() => {
    clearDispatch()
  })

  afterEach(() => {
    store.dispatch(actions.reset({id: TRAINING_PLAN_MODULE_ID}))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should match the snapshot', () => {
    const {container} = renderComponent()
    dispatchResult({})
    expect(container).toMatchSnapshot()
  })
})
