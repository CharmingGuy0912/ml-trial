import {fireEvent} from '@testing-library/react'

import {actions} from '@/modules/ui/counter'
import configureTestStore from '@/utils/test-utils/configure-test-store'
import render from '@/utils/test-utils/custom-render'

import Counter from '../index'
import messages from '../messages'

const {clearDispatch, options, store} = configureTestStore()
const renderComponent = () => render(<Counter />, options)

describe('Counter', () => {
  beforeEach(clearDispatch)

  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container).toMatchSnapshot()
  })

  describe('events', () => {
    describe('click on count', () => {
      it('should dispatch an increment action', () => {
        const {getByText} = renderComponent()
        const matcher = messages.count.defaultMessage.replace('{count}', '0')
        fireEvent.click(getByText(matcher))
        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith(actions.increment())
      })
    })

    describe('click on reset', () => {
      it('should dispatch an reset action', () => {
        const {getByText} = renderComponent()
        fireEvent.click(getByText(messages.reset.defaultMessage))
        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith(actions.reset())
      })
    })
  })
})
