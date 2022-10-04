import {fireEvent} from '@testing-library/react'

import render from '@/utils/test-utils/custom-render'

import DateInput from '../index'

const renderComponent = (props, renderFn = render) =>
  renderFn(<DateInput {...props} />)

describe('DateCyclePicker', () => {
  describe('Input', () => {
    it('should match the snapshot', () => {
      const {container} = renderComponent({value: new Date(1)})
      expect(container.firstChild).toMatchSnapshot()
    })

    it('should update input value on value prop change', () => {
      const {container, rerender} = renderComponent({value: new Date(1)})
      expect(container.firstChild.value).toBe('01.01.1970')
      renderComponent({value: new Date(1646735979483)}, rerender)
      expect(container.firstChild.value).toBe('08.03.2022')
    })

    describe('mask', () => {
      it('should append a . after day input', () => {
        const {container} = renderComponent()
        fireEvent.change(container.firstChild, {target: {value: '28'}})
        expect(container.firstChild.value).toBe('28.')
      })

      it('should append a . after month input', () => {
        const {container} = renderComponent()
        fireEvent.change(container.firstChild, {target: {value: '28.03'}})
        expect(container.firstChild.value).toBe('28.03.')
      })

      it('should add a leading zero to 1-digit day', () => {
        const {container} = renderComponent()
        fireEvent.change(container.firstChild, {target: {value: '1.'}})
        expect(container.firstChild.value).toBe('01.')
      })

      it('should add a leading zero to 1-digit month', () => {
        const {container} = renderComponent()
        fireEvent.change(container.firstChild, {target: {value: '01.1.'}})
        expect(container.firstChild.value).toBe('01.01.')
      })
    })

    describe('events', () => {
      it('should call onChange on blur', () => {
        const onChange = jest.fn()
        const {container} = renderComponent({onChange, value: new Date(1)})

        expect(onChange).not.toHaveBeenCalled()
        fireEvent.change(container.firstChild, {target: {value: '08.03.2022'}})
        fireEvent.blur(container.firstChild)
        expect(onChange).toHaveBeenCalledWith(new Date(2022, 2, 8))
      })
      it('should call onChange and blur on Enter key down', () => {
        const onChange = jest.fn()
        const {container} = renderComponent({onChange, value: new Date(1)})
        container.firstChild.blur = jest.fn()
        expect(container.firstChild.blur).not.toHaveBeenCalled()
        expect(onChange).not.toHaveBeenCalled()
        fireEvent.keyDown(container.firstChild, {key: 'Enter'})
        expect(container.firstChild.blur).toHaveBeenCalled()
        expect(onChange).toHaveBeenCalled()
      })

      it('should not call onChange and blur on any other key down', () => {
        const onChange = jest.fn()
        const {container} = renderComponent({onChange, value: new Date(1)})
        container.firstChild.blur = jest.fn()
        expect(container.firstChild.blur).not.toHaveBeenCalled()
        expect(onChange).not.toHaveBeenCalled()
        fireEvent.keyDown(container.firstChild, {key: 'ArrowRight'})
        expect(container.firstChild.blur).not.toHaveBeenCalled()
        expect(onChange).not.toHaveBeenCalled()
      })

      it('should reset input value on confirm of invalid date input', () => {
        const onChange = jest.fn()
        const {container} = renderComponent({onChange, value: new Date(1)})

        expect(onChange).not.toHaveBeenCalled()
        fireEvent.change(container.firstChild, {target: {value: 'foo'}})
        fireEvent.blur(container.firstChild)
        expect(onChange).not.toHaveBeenCalled()
        expect(container.firstChild.value).toBe('01.01.1970')
      })
    })
  })
})
