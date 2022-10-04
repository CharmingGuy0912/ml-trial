import {render} from '@testing-library/react'

import Tag from '../index'

const text = 'Tag Text'
const renderComponent = () => render(<Tag>{text}</Tag>)

describe('Tag', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render its children', () => {
    const {getByText} = renderComponent()
    expect(getByText(text)).toBeInTheDocument()
  })
})
