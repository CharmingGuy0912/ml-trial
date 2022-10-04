import {act, waitFor} from '@testing-library/react'

import {history} from '@/configure-store'
import render from '@/utils/test-utils/custom-render'

import Navigation from '../index'

const options = {wrapperProps: {hasRouter: true}}
const renderComponent = () => render(<Navigation />, options)

describe('Navigation', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render one navigation level', async () => {
    const {container} = renderComponent()
    act(() => {
      history.push('/medicine')
    })
    await waitFor(() =>
      expect(container.querySelectorAll('nav')).toHaveLength(1)
    )
  })

  it('should render two navigation levels', async () => {
    const {container} = renderComponent()
    act(() => {
      history.push('/medicine/analysis')
    })
    await waitFor(() =>
      expect(container.querySelectorAll('nav')).toHaveLength(2)
    )
  })

  it('should render three navigation levels', async () => {
    const {container} = renderComponent()
    act(() => {
      history.push('/medicine/analysis/missed-games')
    })
    await waitFor(() =>
      expect(container.querySelectorAll('nav')).toHaveLength(3)
    )
  })

  it('should not render 2nd level menu on unknown path', () => {
    const {container} = renderComponent()
    act(() => {
      history.push('/medicine/foo')
    })
    expect(container.querySelectorAll('nav')).toHaveLength(1)
  })

  it('should not render 3rd level menu on unknown path', () => {
    const {container} = renderComponent()
    act(() => {
      history.push('/medicine/analysis/bar')
    })
    expect(container.querySelectorAll('nav')).toHaveLength(2)
  })
})
