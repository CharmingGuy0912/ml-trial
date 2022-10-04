import render from '@/utils/test-utils/custom-render'

import Theme from '../index'

const renderComponent = () => render(<Theme />)

describe('Theme', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })
})
