import {fireEvent, waitFor} from '@testing-library/react'

import dateFieldFrameMessages from '@/components/atoms/DateFieldFrame/messages'
import configureTestStore from '@/utils/test-utils/configure-test-store'
import render from '@/utils/test-utils/custom-render'

import DatePicker from '../index'
import messages from '../messages'

const {clearDispatch, options} = configureTestStore()
const renderComponent = props => render(<DatePicker {...props} />, options)

describe('DatePicker', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 2, 28).getTime())
  })

  beforeEach(clearDispatch)

  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should close picker after date select', async () => {
    const {getByText, getByLabelText, queryByRole} = renderComponent({
      value: new Date('2022-03-28')
    })
    const toggle = getByLabelText(dateFieldFrameMessages.toggle.defaultMessage)
    fireEvent.click(toggle)
    expect(queryByRole('dialog')).toBeInTheDocument()
    fireEvent.click(getByText('10').parentElement)
    await waitFor(() => expect(queryByRole('dialog')).not.toBeInTheDocument())
  })

  describe('events', () => {
    it('should call onChange prop on input change', () => {
      const onChange = jest.fn()
      const {getByLabelText} = renderComponent({onChange})
      const input = getByLabelText(messages.date.defaultMessage)
      fireEvent.change(input, {target: {value: '08.03.2022'}})
      fireEvent.blur(input)
      expect(onChange).toHaveBeenCalledWith(new Date('2022-03-08 00:00:00'))
    })

    it('should call onChange prop on calendar day click', () => {
      const onChange = jest.fn()
      const {getByLabelText, getByText} = renderComponent({onChange})
      const toggle = getByLabelText(
        dateFieldFrameMessages.toggle.defaultMessage
      )
      fireEvent.click(toggle)
      fireEvent.click(getByText('10').parentElement)
      expect(onChange).toHaveBeenCalledWith(new Date('2022-03-10 00:00:00'))
    })
  })
})
