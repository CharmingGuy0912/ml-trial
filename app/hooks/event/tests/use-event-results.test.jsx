import useEventResults from '@/hooks/event/use-event-results'
import EventResultsInjector from '@/injectors/event/ResultsInjector'
import {actions} from '@/modules/event/results'
import configureTestStore from '@/utils/test-utils/configure-test-store'
import render from '@/utils/test-utils/custom-render'
import renderInjectors from '@/utils/test-utils/render-injectors'

const {clearDispatch, options, store} = configureTestStore()

const date = new Date('2022-04-14')
const month = new Date('2022-03-01 00:00:00')
const TestComponent = ({shouldLoadOnMount}) => {
  const [, events] = useEventResults({
    date,
    shouldLoadOnMount
  })
  return <div onClick={() => events.onChangeMonth(month)}>change week</div>
}

const renderComponent = (props = {}) =>
  render(<TestComponent {...props} />, options)

describe('event results hook', () => {
  beforeAll(() => {
    renderInjectors(<EventResultsInjector />, options)
  })

  beforeEach(clearDispatch)

  it('should not dispatch the load action on mount', () => {
    renderComponent()
    expect(store.dispatch).not.toHaveBeenCalled()
  })

  it('should dispatch the load action on mount', () => {
    renderComponent({shouldLoadOnMount: true})
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.load({id: 'default', offset: 0})
    )
  })

  it('should dispatch a reset action with correct payload on unmount', () => {
    const {unmount} = renderComponent()
    clearDispatch()
    unmount()
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(actions.reset({id: 'default'}))
  })
})
