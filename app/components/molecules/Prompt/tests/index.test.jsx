import render from '@/utils/test-utils/custom-render'

import Prompt from '../index'

const renderComponent = () =>
  render(
    <Prompt actions={<button>Action</button>} title="Title" isOpen>
      Content
    </Prompt>
  )

describe('Prompt', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })
})
