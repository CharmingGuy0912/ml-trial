import {render} from '@testing-library/react'

import PageTemplate from '../index'

const renderComponent = () =>
  render(
    <PageTemplate header="Header" footer="Footer">
      Children
    </PageTemplate>
  )

describe('PageTemplate', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })
})
