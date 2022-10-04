import EVENT_TYPES, {EVENT_COLORS} from '@/modules/event/results/types'
import configureTestStore from '@/utils/test-utils/configure-test-store'
import render from '@/utils/test-utils/custom-render'
import renderInjectors from '@/utils/test-utils/render-injectors'
import setEntities from '@/utils/test-utils/set-entities'

import EventsIndicator from '../index'

const eventIds = ['123']

const {clearDispatch, store, options} = configureTestStore()
const renderComponent = (props = {}) =>
  render(<EventsIndicator eventIds={eventIds} {...props} />, options)

describe('EventsIndicator', () => {
  renderInjectors(null, options)
  setEntities(store, {
    events: {
      [eventIds[0]]: {id: eventIds[0], type: EVENT_TYPES.TOURNAMENT}
    }
  })

  beforeEach(clearDispatch)

  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should show light background color for isLight prop', () => {
    const {container} = renderComponent({isLight: true})
    expect(container.firstChild.firstChild).toHaveClass(
      `bg-${EVENT_COLORS[EVENT_TYPES.TOURNAMENT]}-light`
    )
  })
})
