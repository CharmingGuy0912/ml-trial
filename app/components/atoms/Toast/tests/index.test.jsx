import {fireEvent} from '@testing-library/react'

import ToastContainer from '@/components/atoms/ToastContainer'
import render from '@/utils/test-utils/custom-render'

import {TOAST_TYPES, TOAST_VARIANTS} from '../components/constants'
import toast from '../index'

const defaultProps = {
  text: 'Success toast!',
  type: TOAST_TYPES.BASIC,
  variant: TOAST_VARIANTS.SUCCESS
}

const TestComponent = props => {
  const onNotify = toast(props)

  return <button onClick={onNotify}>toast</button>
}

const renderComponent = (props = {}) =>
  render(
    <>
      <ToastContainer />
      <TestComponent {...defaultProps} {...props} />
    </>
  )

describe('Toast', () => {
  it('should match the snapshot for unknown variant', () => {
    const {container} = renderComponent({type: null, variant: 'unknown'})
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render basic success toast', async () => {
    const {getByText, findByRole} = renderComponent()
    fireEvent.click(getByText('toast'))
    const successToast = await findByRole('alert')
    expect(successToast).toHaveTextContent(defaultProps.text)
  })

  it('should render action error toast', async () => {
    const props = {
      actionText: 'undo',
      onActionClick: jest.fn(),
      text: 'some error',
      type: TOAST_TYPES.ACTION,
      variant: TOAST_VARIANTS.ERROR
    }
    const {getByText, findByRole} = renderComponent(props)
    fireEvent.click(getByText('toast'))
    const errorToast = await findByRole('alert')
    expect(errorToast).toHaveTextContent(props.text)
  })

  it('should render close-action error toast', async () => {
    const props = {
      onActionClick: jest.fn(),
      text: 'some error',
      type: TOAST_TYPES.CLOSE_ACTION,
      variant: TOAST_VARIANTS.ERROR
    }
    const {getByText, findByRole} = renderComponent(props)
    fireEvent.click(getByText('toast'))
    const errorToast = await findByRole('alert')
    expect(errorToast).toHaveTextContent(props.text)
  })

  describe('events', () => {
    it('should call onActionClick function on click', async () => {
      const props = {
        actionText: 'undo',
        onActionClick: jest.fn(),
        type: TOAST_TYPES.ACTION
      }
      const {getByText, findByRole} = renderComponent(props)
      fireEvent.click(getByText('toast'))
      const errorToast = await findByRole('alert')
      const action = errorToast.parentElement.querySelector('button')
      fireEvent.click(action)
      expect(props.onActionClick).toHaveBeenCalled()
    })
  })
})
