import {createEvent, fireEvent} from '@testing-library/react'

import render from '@/utils/test-utils/custom-render'

import Input from '../index'

describe('Input', () => {
  it('should match the snapshot', () => {
    const {container} = render(<Input />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should change styling on focus', () => {
    const {container} = render(<Input />)
    const input = container.querySelector('input')

    fireEvent.focus(input)
    expect(container.firstChild).toHaveClass('border-white bg-white')
    fireEvent.blur(input)
    expect(container.firstChild).not.toHaveClass('border-white bg-white')
  })

  it('should update input value on value prop change', () => {
    const {rerender, container} = render(<Input />)
    const input = container.querySelector('input')

    fireEvent.change(input, {target: {value: 'foo'}})
    expect(input.value).toBe('foo')
    rerender(<Input value="bar" />)
    expect(input.value).toBe('bar')
  })

  it('should call onChange prop on change', () => {
    const onChange = jest.fn()
    const {container} = render(<Input onChange={onChange} />)
    const input = container.querySelector('input')

    expect(onChange).not.toHaveBeenCalled()
    fireEvent.change(input, {target: {value: 'foo'}})
    expect(onChange).toHaveBeenCalledWith('foo')
  })

  it('should not prevent non-numbers to be entered for text input', () => {
    const {container} = render(<Input type="text" />)
    const input = container.querySelector('input')

    const keyDownEvent = createEvent.keyDown(input, {key: 'a'})
    fireEvent(input, keyDownEvent)
    expect(keyDownEvent.defaultPrevented).toBe(false)
  })
})
