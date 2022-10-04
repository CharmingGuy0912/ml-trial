import {fireEvent, waitFor} from '@testing-library/react'

import {history} from '@/configure-store'
import render from '@/utils/test-utils/custom-render'

import NavigationItem from '../index'

jest.mock('@/components/atoms/Icon/ArrowDropDown', () => () => (
  <div data-testid="ArrowDropDownIcon" />
))

const defaultProps = {
  children: 'Navigation Item'
}

const options = {wrapperProps: {hasRouter: true}}
const renderComponent = props =>
  render(<NavigationItem {...defaultProps} {...props} />, options)

describe('NavigationItem', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render a caret', () => {
    const {getByTestId} = renderComponent({hasSublevel: true})
    expect(getByTestId('ArrowDropDownIcon')).toBeInTheDocument()
  })

  it('should navigate on click', async () => {
    const {container} = renderComponent({to: '/baz'})
    fireEvent.click(container.firstChild)
    await waitFor(() => expect(history.location.pathname).toBe('/baz'))
  })

  it('should not navigate on click if disabled', () => {
    const onClick = jest.fn()
    const {container} = renderComponent({
      isDisabled: true,
      onClick,
      to: '/foo/bar'
    })
    fireEvent.click(container.firstChild)
    expect(onClick).not.toHaveBeenCalled()
    expect(container.firstChild.href).toBe('')
  })
})
