import {fireEvent} from '@testing-library/react'

import render from '@/utils/test-utils/custom-render'

import useIsOpen from '../use-is-open'

const TestComponent = () => {
  const [isOpen, events] = useIsOpen()
  return (
    <>
      {/* eslint-disable-next-line no-ternary */}
      <span>{isOpen ? 'Opened' : 'Closed'}</span>
      <button onClick={events.close}>Close</button>
      <button onClick={events.open}>Open</button>
      <button onClick={events.toggle}>Toggle</button>
    </>
  )
}
const renderComponent = (props = {}, renderFn = render) =>
  renderFn(<TestComponent {...props} />)

describe('hooks', () => {
  describe('useIsOpen', () => {
    describe('open', () => {
      it('should set the isOpen state to true', () => {
        const {queryByText} = renderComponent()
        expect(queryByText('Opened')).not.toBeInTheDocument()
        fireEvent.click(queryByText('Open'))
        expect(queryByText('Opened')).toBeInTheDocument()
      })
    })

    describe('close', () => {
      it('should set the isOpen state to false', () => {
        const {queryByText} = renderComponent()
        fireEvent.click(queryByText('Open'))
        expect(queryByText('Opened')).toBeInTheDocument()
        fireEvent.click(queryByText('Close'))
        expect(queryByText('Opened')).not.toBeInTheDocument()
      })
    })

    describe('toggle', () => {
      it('should toggle the isOpen state', () => {
        const {queryByText} = renderComponent()
        expect(queryByText('Opened')).not.toBeInTheDocument()
        fireEvent.click(queryByText('Toggle'))
        expect(queryByText('Opened')).toBeInTheDocument()
        fireEvent.click(queryByText('Toggle'))
        expect(queryByText('Opened')).not.toBeInTheDocument()
      })
    })
  })
})
