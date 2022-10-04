import {fireEvent} from '@testing-library/react'

import ComboBox from '@/components/atoms/ComboBox'
import render from '@/utils/test-utils/custom-render'

const defaultProps = {
  options: [
    {label: 'Option #1', value: 'option-1'},
    {isDisabled: true, label: 'Option #2', value: 'option-2'},
    {label: 'Option #3', value: 'option-3'}
  ]
}

const renderComponent = (props = {}) =>
  render(<ComboBox {...defaultProps} {...props} />)

describe('ComboBox', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should match the snapshot if the menu is open', () => {
    const {container, getByRole} = renderComponent()
    const combobox = getByRole('combobox')
    fireEvent.input(combobox, {target: {value: 'O'}})
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should match the snapshot if an option has been selected', () => {
    const {container, queryByText, getByRole} = renderComponent()
    const combobox = getByRole('combobox')
    fireEvent.input(combobox, {target: {value: 'O'}})
    fireEvent.click(queryByText(defaultProps.options[0].label))
    expect(container.firstChild).toMatchSnapshot()
  })

  describe('isMulti', () => {
    it('should match the snapshot', () => {
      const {container, getByRole} = renderComponent({isMulti: true})
      const combobox = getByRole('combobox')
      fireEvent.input(combobox, {target: {value: 'O'}})
      expect(container.firstChild).toMatchSnapshot()
    })

    it('should match the snapshot if an option has been selected', () => {
      const {container, queryByText, getByRole} = renderComponent({
        isMulti: true
      })
      const combobox = getByRole('combobox')
      fireEvent.input(combobox, {target: {value: 'O'}})
      fireEvent.click(queryByText(defaultProps.options[0].label))
      expect(container.firstChild).toMatchSnapshot()
    })

    it('should call the on change prop and close the menu if a value has been selected', () => {
      const onChange = jest.fn()
      const {queryByText, getByRole} = renderComponent({onChange})
      const combobox = getByRole('combobox')
      fireEvent.input(combobox, {target: {value: 'O'}})
      fireEvent.click(queryByText(defaultProps.options[0].label))
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(defaultProps.options[0])
      fireEvent.input(combobox, {target: {value: 'O'}})
      fireEvent.click(queryByText(defaultProps.options[2].label))
      expect(onChange).toHaveBeenCalledWith(defaultProps.options[2])
    })
  })

  it('should render the passed options if open', () => {
    const {getByText, getByRole} = renderComponent()
    const combobox = getByRole('combobox')
    fireEvent.input(combobox, {target: {value: 'O'}})
    defaultProps.options.forEach(option =>
      expect(getByText(option.label)).toBeInTheDocument()
    )
  })

  it('should call the on change prop and close the menu if a value has been selected', () => {
    const onChange = jest.fn()
    const {queryByText, getByRole} = renderComponent({onChange})
    const combobox = getByRole('combobox')
    fireEvent.input(combobox, {target: {value: 'O'}})
    fireEvent.click(queryByText(defaultProps.options[0].label))
    expect(queryByText(defaultProps.options[0].label)).toBeInTheDocument()
    expect(queryByText(defaultProps.options[1].label)).not.toBeInTheDocument()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(defaultProps.options[0])
  })

  it('should not close the menu if the option to be selected is disabled', () => {
    const {queryByText, getByRole} = renderComponent({})
    const combobox = getByRole('combobox')
    fireEvent.input(combobox, {target: {value: 'O'}})
    fireEvent.click(queryByText(defaultProps.options[1].label))
    defaultProps.options.forEach(option =>
      expect(queryByText(option.label)).toBeInTheDocument()
    )
  })

  it('should close the menu on escape', () => {
    const {queryByText, getByRole} = renderComponent({})
    const combobox = getByRole('combobox')
    fireEvent.keyDown(combobox, {key: 'ArrowDown'})
    expect(queryByText(defaultProps.options[1].label)).toBeInTheDocument()
    fireEvent.keyDown(combobox, {key: 'Escape'})
    expect(queryByText(defaultProps.options[1].label)).not.toBeInTheDocument()
  })
})
