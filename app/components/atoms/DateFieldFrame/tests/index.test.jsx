import {fireEvent} from '@testing-library/react'

import render from '@/utils/test-utils/custom-render'

import DateFieldFrame from '../index'
import messages from '../messages'

const renderComponent = (props, renderFn = render) =>
  renderFn(<DateFieldFrame {...props} />)

describe('DateFieldFrame', () => {
  it('should match the snapshot', () => {
    const {container, rerender} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
    renderComponent({isOpen: true}, rerender)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render previousButton and nextButton props', () => {
    const {getByText} = renderComponent({
      nextButton: <div>nextButton</div>,
      previousButton: <div>previousButton</div>
    })
    expect(getByText('previousButton')).toBeInTheDocument()
    expect(getByText('nextButton')).toBeInTheDocument()
  })

  it('should call onToggle prop on toggle click', () => {
    const onToggle = jest.fn()
    const {getByLabelText} = renderComponent({onToggle})
    const toggle = getByLabelText(messages.toggle.defaultMessage)
    fireEvent.click(toggle)
    expect(onToggle).toHaveBeenCalled()
  })

  it('should call onToggle prop on toggle click', () => {
    const onCenterClick = jest.fn()
    const {container} = renderComponent({onCenterClick})
    fireEvent.click(container.firstChild.firstChild)
    expect(onCenterClick).toHaveBeenCalled()
  })
})
