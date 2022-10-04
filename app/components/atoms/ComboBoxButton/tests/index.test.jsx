import {fireEvent} from '@testing-library/react'
import React from 'react'

import render from '@/utils/test-utils/custom-render'

import ComboBoxButton from '../index'

// eslint-disable-next-line no-unused-vars
const Button = React.forwardRef(({isDisabled, ...props}, ref) => (
  <button ref={ref} {...props}>
    Button
  </button>
))

const defaultProps = {
  options: [{label: 'Option #1', value: 'option-id-1'}],
  placeholder: 'Placeholder'
}
const renderComponent = props =>
  render(<ComboBoxButton as={Button} {...defaultProps} {...props} />)

describe('ComboBoxButton', () => {
  it('should open a popover on button click', () => {
    const {queryByText} = renderComponent()
    expect(queryByText('Placeholder')).not.toBeInTheDocument()
    fireEvent.click(queryByText('Button'))
    expect(queryByText('Placeholder')).toBeInTheDocument()
  })

  it('should call the onChange prop once the select changes, so that the popover can be closed', () => {
    const onChange = jest.fn(close => close())
    const {queryByText} = renderComponent({onChange})
    fireEvent.click(queryByText('Button'))
    expect(queryByText('Placeholder')).toBeInTheDocument()
    fireEvent.click(queryByText(defaultProps.options[0].label))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      expect.any(Function),
      defaultProps.options[0]
    )
    expect(queryByText('Placeholder')).not.toBeInTheDocument()
  })
})
