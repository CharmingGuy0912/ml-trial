import render from '@/utils/test-utils/custom-render'

import useUpdateEffect from '../use-update-effect'

const update = jest.fn()

const TestComponent = ({updateDependencies}) => {
  useUpdateEffect(() => {
    update()
  }, updateDependencies)
  return null
}
const renderComponent = (props = {}, renderFn = render) =>
  renderFn(<TestComponent {...props} />)

describe('hooks', () => {
  describe('useUpdateEffect', () => {
    it('should trigger popper update', () => {
      const {rerender} = renderComponent({updateDependencies: [0]})
      update.mockClear()
      expect(update).not.toHaveBeenCalled()
      renderComponent({updateDependencies: [1]}, rerender)
      expect(update).toHaveBeenCalled()
    })
  })
})
