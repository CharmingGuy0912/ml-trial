import {act} from '@testing-library/react'

import {history} from '@/configure-store'
import render from '@/utils/test-utils/custom-render'

import NotFoundPage from '..'
import messages from '../messages'

const renderComponent = () =>
  render(<NotFoundPage />, {wrapperProps: {hasRouter: true}})

describe('NotFoundPage', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container).toMatchSnapshot()
  })

  it('should render 404 message on unknown page', () => {
    const {getByText} = renderComponent()
    act(() => {
      history.push('/training-plan/periodization/foo')
    })
    expect(getByText(messages.notFound.defaultMessage)).toBeInTheDocument()
  })

  it('should render page title if found in dummy menu', () => {
    const {getByText} = renderComponent()
    act(() => {
      history.push('/training-plan/periodization')
    })
    expect(getByText('Periodization')).toBeInTheDocument()
  })
})
