import render from '@/utils/test-utils/custom-render'

import PageLoadingIndicator from '../index'

const renderComponent = () => render(<PageLoadingIndicator />)

describe('PageLoadingIndicator', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })
})
