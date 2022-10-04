import render from '@/utils/test-utils/custom-render'

import Modal from '../index'

const renderComponent = props =>
  render(
    <Modal header="Heading" footer={<button>Footer</button>} isOpen {...props}>
      Content
    </Modal>
  )

describe('Modal', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the extra footer slot', () => {
    const footerSlot = 'footer slot'
    const {getByText} = renderComponent({footerSlot})
    expect(getByText(footerSlot)).toBeInTheDocument()
  })
})
