import {fireEvent} from '@testing-library/react'
import {useRegisterSW} from 'virtual:pwa-register/react'

import render from '@/utils/test-utils/custom-render'

import ReloadPrompt from '../index'
import messages from '../messages'

jest.mock('virtual:pwa-register/react')
jest.mock('@/components/molecules/Prompt')

const renderComponent = () => render(<ReloadPrompt />)

describe('ReloadPrompt', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container).toMatchSnapshot()
  })

  describe('events', () => {
    it('should set needRefresh to false when cancel is clicked', () => {
      const {getByText, queryByText} = renderComponent()
      expect(queryByText(messages.title.defaultMessage)).toBeInTheDocument()
      fireEvent.click(getByText(messages.cancel.defaultMessage))
      expect(queryByText(messages.title.defaultMessage)).not.toBeInTheDocument()
    })

    it('should call the updateServiceWorker function when refresh is clicked', () => {
      const setNeedRefresh = jest.fn()
      const updateServiceWorker = jest.fn()
      useRegisterSW.mockReturnValueOnce({
        needRefresh: [true, setNeedRefresh],
        updateServiceWorker
      })
      const {getByText} = renderComponent()
      fireEvent.click(getByText(messages.refresh.defaultMessage))
      expect(setNeedRefresh).toHaveBeenCalledTimes(1)
      expect(setNeedRefresh).toHaveBeenCalledWith(false)
      expect(updateServiceWorker).toHaveBeenCalledTimes(1)
      expect(updateServiceWorker).toHaveBeenCalledWith(true)
    })
  })
})
