import slice, {actions} from '../slice'

describe('ui modules', () => {
  describe('counter slice', () => {
    describe('actions', () => {
      describe('increment', () => {
        it('should increment the count state by 1', () => {
          const nextState = slice.reducer({count: 0}, actions.increment())
          expect(nextState.count).toBe(1)
        })
      })

      describe('setCount', () => {
        it('should set the count state to the count payload', () => {
          const count = 2
          const nextState = slice.reducer({}, actions.setCount({count}))
          expect(nextState.count).toBe(count)
        })
      })
    })
  })
})
