import commonMessages from '@/components/common-messages'
import render from '@/utils/test-utils/custom-render'

import Spinner, {SPINNER_TYPES} from '../index'

const renderComponent = (props = {}, renderFn = render) =>
  renderFn(<Spinner {...props} />)

describe('Spinner', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render a screen reader only text', () => {
    const {getByText} = renderComponent()
    expect(getByText(commonMessages.loading.defaultMessage)).toBeInTheDocument()
  })

  it('should render the correct class names', () => {
    const {container, rerender} = renderComponent()
    expect(container.firstChild).toHaveClass('border-l-primary')
    renderComponent({type: SPINNER_TYPES.SECONDARY}, rerender)
    expect(container.firstChild).not.toHaveClass('border-l-primary')
    expect(container.firstChild).toHaveClass('border-l-gray-medium')
  })
})
