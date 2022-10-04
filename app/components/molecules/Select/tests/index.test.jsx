import render from '@/utils/test-utils/custom-render'

import Select from '../index'

const renderComponent = (props = {}) => render(<Select {...props} />)

describe('Select', () => {
  it('should render the label', () => {
    const label = 'Select Label'
    const {getByText} = renderComponent({label})
    expect(getByText(label)).toBeInTheDocument()
  })

  it('should render an asterisks if it is required', () => {
    const {getByText} = renderComponent({isRequired: true})
    expect(getByText('*')).toBeInTheDocument()
  })

  it('should render an error styling and the error itself if there is one', () => {
    const error = 'Something went wrong'
    const {container, getByText} = renderComponent({error})
    expect(container.firstChild).toHaveClass('text-primary')
    expect(getByText(error)).toBeInTheDocument()
  })
})
