import {fireEvent} from '@testing-library/react'

import commonMessages from '@/components/common-messages'
import configureTestStore from '@/utils/test-utils/configure-test-store'
import render from '@/utils/test-utils/custom-render'

import Picker from '../components/Picker'

const {clearDispatch, options} = configureTestStore()
const renderComponent = (props, renderFn = render) =>
  renderFn(<Picker value={new Date(2022, 2, 7)} {...props} />, options)

describe('DateCyclePicker', () => {
  describe('Picker', () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date(2022, 2, 7).getTime())
    })

    beforeEach(clearDispatch)

    it('should match the snapshot', () => {
      const {container} = renderComponent()
      expect(container.firstChild).toMatchSnapshot()
    })

    it('should update internal value on prop value change', () => {
      const {getByText, rerender} = renderComponent({
        value: new Date('2022-03-21')
      })
      expect(getByText('21').parentElement).toHaveClass('specific:bg-primary')
      renderComponent({value: new Date('2022-03-14')}, rerender)
      expect(getByText('21').parentElement).not.toHaveClass(
        'specific:bg-primary'
      )
      expect(getByText('14').parentElement).toHaveClass('specific:bg-primary')
    })

    describe('events', () => {
      it('should highlight whole week on day hover', () => {
        const {getByText} = renderComponent()
        const dayButton = getByText('10').parentElement
        const weekStartDayButton = getByText('7').parentElement
        const weekEndDayButton = getByText('13').parentElement
        fireEvent.mouseEnter(dayButton)
        expect(dayButton).toHaveClass('bg-gray-light')
        expect(weekStartDayButton).toHaveClass('bg-silver rounded-l')
        expect(weekEndDayButton).toHaveClass('bg-silver rounded-r')
        fireEvent.mouseLeave(dayButton)
        expect(dayButton).not.toHaveClass('bg-gray-light')
        expect(weekStartDayButton).not.toHaveClass('bg-silver rounded-l')
        expect(weekEndDayButton).not.toHaveClass('bg-silver rounded-r')
      })

      it('should call onChange prop on day click if not isConfirmable', () => {
        const onChange = jest.fn()
        const {getByText} = renderComponent({
          isConfirmable: false,
          onChange,
          value: new Date(2022, 2, 14)
        })
        const dayButton = getByText('10').parentElement
        fireEvent.click(dayButton)
        expect(onChange).toHaveBeenCalledWith(new Date(2022, 2, 7))
      })

      it('should call onChange prop on day click if isConfirmable after confirm', () => {
        const onChange = jest.fn()
        const {getByText} = renderComponent({
          isConfirmable: true,
          onChange,
          value: new Date(2022, 2, 14)
        })
        const dayButton = getByText('10').parentElement
        const confirmButton = getByText(commonMessages.apply.defaultMessage)
        fireEvent.click(dayButton)
        expect(onChange).not.toHaveBeenCalled()
        fireEvent.click(confirmButton)
        expect(onChange).toHaveBeenCalledWith(new Date(2022, 2, 7))
      })
    })
  })
})
