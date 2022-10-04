import {fireEvent} from '@testing-library/react'

import Tooltip from '@/components/atoms/Tooltip'
import render from '@/utils/test-utils/custom-render'

const defaultProps = {
  children: <div>Trigger</div>,
  title: 'Tooltip Content'
}
const renderComponent = (props = {}) =>
  render(<Tooltip {...defaultProps} {...props} />)

describe('Tooltip', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be visible on mouse over', () => {
    const {getByText} = renderComponent()
    expect(getByText(defaultProps.title)).toHaveClass('opacity-0')
    expect(getByText(defaultProps.title)).not.toHaveClass('opacity-100')
    fireEvent.mouseEnter(getByText('Trigger'))
    expect(getByText(defaultProps.title)).not.toHaveClass('opacity-0')
    expect(getByText(defaultProps.title)).toHaveClass('opacity-100')
    fireEvent.mouseLeave(getByText('Trigger'))
    expect(getByText(defaultProps.title)).toHaveClass('opacity-0')
    expect(getByText(defaultProps.title)).not.toHaveClass('opacity-100')
  })

  it('should be visible on focus', () => {
    const {getByText} = renderComponent()
    expect(getByText(defaultProps.title)).toHaveClass('opacity-0')
    expect(getByText(defaultProps.title)).not.toHaveClass('opacity-100')
    fireEvent.focusIn(getByText('Trigger'))
    expect(getByText(defaultProps.title)).not.toHaveClass('opacity-0')
    expect(getByText(defaultProps.title)).toHaveClass('opacity-100')
    fireEvent.focusOut(getByText('Trigger'))
    expect(getByText(defaultProps.title)).toHaveClass('opacity-0')
    expect(getByText(defaultProps.title)).not.toHaveClass('opacity-100')
  })
})
