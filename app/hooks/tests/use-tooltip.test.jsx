import {usePopper} from 'react-popper'

import render from '@/utils/test-utils/custom-render'

import useTooltip from '../use-tooltip'

const update = jest.fn()

jest.mock('react-popper', () => ({usePopper: jest.fn()}))
usePopper.mockReturnValue({
  attributes: {},
  styles: {},
  update
})

const BlankTestComponent = () => {
  useTooltip()
  return null
}

const TestComponent = props => {
  useTooltip(props)
  return null
}

describe('hooks', () => {
  describe('useTooltip', () => {
    it('should call usePopper hook with default values', () => {
      usePopper.mockClear()
      render(<BlankTestComponent />)
      expect(usePopper).toHaveBeenCalledWith(null, null, {
        modifiers: [{name: 'offset', options: {offset: [0, 0]}}],
        placement: 'bottom'
      })
    })

    it('should trigger popper update', () => {
      const {rerender} = render(<TestComponent updateDependencies={[0]} />)
      update.mockClear()
      expect(update).not.toHaveBeenCalled()
      rerender(<TestComponent updateDependencies={[0]} />)
      expect(update).not.toHaveBeenCalled()
      rerender(<TestComponent updateDependencies={[1]} />)
      expect(update).toHaveBeenCalled()
    })
  })
})
