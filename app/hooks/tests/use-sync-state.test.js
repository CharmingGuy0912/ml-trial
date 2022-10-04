import render from '@/utils/test-utils/custom-render'

import useSyncState from '../use-sync-state'

const TestComponent = props => {
  const [state] = useSyncState(props.value)
  return <span>{state}</span>
}
const renderComponent = (props = {}, renderFn = render) =>
  renderFn(<TestComponent {...props} />)

describe('hooks', () => {
  describe('useSyncState', () => {
    it('should update the state if the prop changes', () => {
      const {getByText, rerender} = renderComponent({value: 'Text'})
      expect(getByText('Text')).toBeInTheDocument()
      renderComponent({value: 'Next Text'}, rerender)
      expect(getByText('Next Text')).toBeInTheDocument()
    })
  })
})
