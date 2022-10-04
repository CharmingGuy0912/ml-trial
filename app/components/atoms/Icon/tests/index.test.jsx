import render from '@/utils/test-utils/custom-render'

import Icon from '../index'

const renderComponent = props => render(<Icon {...props} />)

describe('Icon', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent({component: () => 'foo'})
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render provided component', () => {
    const {getByText} = renderComponent({
      component: () => <div>le component</div>
    })
    expect(getByText('le component')).toBeInTheDocument()
  })

  it('should add classNames', () => {
    const {container} = renderComponent({
      component: props => <div {...props} />
    })
    expect(container.firstChild).toHaveClass('fill-current')
  })
})
