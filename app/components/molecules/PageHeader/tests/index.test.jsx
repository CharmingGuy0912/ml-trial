import render from '@/utils/test-utils/custom-render'

import PageHeader from '..'

describe('PageHeader', () => {
  it('should match the snapshot', () => {
    const {container} = render(
      <PageHeader
        title="Title"
        leftSlot="left"
        centerSlot="center"
        rightSlot="right"
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
