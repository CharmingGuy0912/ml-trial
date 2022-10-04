import render from '@/utils/test-utils/custom-render'

import Button from '../index'

const defaultProps = {
  children: 'Button Text'
}

const renderComponent = (props = {}, renderFn = render) =>
  renderFn(<Button {...defaultProps} {...props} />)

describe('Button', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render its children', () => {
    const {getByText} = renderComponent()
    expect(getByText(defaultProps.children)).toBeInTheDocument()
  })

  it('should render startIcon', () => {
    const startIcon = 'startIcon'
    const {getByText} = renderComponent({startIcon})
    expect(getByText(startIcon)).toBeInTheDocument()
  })

  it('should render endIcon', () => {
    const endIcon = 'endIcon'
    const {getByText} = renderComponent({endIcon})
    expect(getByText(endIcon)).toBeInTheDocument()
  })

  it('should render spinner', () => {
    const {container, rerender} = renderComponent({isLoading: true})
    expect(container.firstChild.firstChild).toHaveClass(
      'specific:w-4 specific:h-4 specific:border-2 border-l-gray-medium'
    )
    renderComponent({isDisabled: true, isLoading: true}, rerender)
    expect(container.firstChild.firstChild).toHaveClass('border-l-primary')
  })
})
