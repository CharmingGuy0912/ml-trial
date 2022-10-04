import configureTestStore from '@/utils/test-utils/configure-test-store'
import render from '@/utils/test-utils/custom-render'

import HomePage from '../index'

jest.mock('@/components/organisms/Counter', () => () => <div>Counter</div>)

const {clearDispatch, options} = configureTestStore()
const renderComponent = () => render(<HomePage />, options)

describe('HomePage', () => {
  beforeEach(clearDispatch)

  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })
})
