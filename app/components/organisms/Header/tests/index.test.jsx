import {fireEvent} from '@testing-library/react'

import render from '@/utils/test-utils/custom-render'

import Header from '../index'

jest.mock('@tanstack/react-location', () => ({
  ...jest.requireActual('@tanstack/react-location'),
  Link({children, ...props}) {
    return (
      <a {...props} href={props.to}>
        {children}
      </a>
    )
  }
}))
jest.mock('@/components/molecules/Navigation', () => ({cta, settings}) => (
  <div data-testid="navigation">
    {cta}
    <div>Navigation</div>
    {settings}
  </div>
))
jest.mock('@faker-js/faker', () => {
  const originalModule = jest.requireActual('@faker-js/faker')
  return {
    ...originalModule,
    faker: {
      ...originalModule.faker,
      datatype: {
        number: jest.fn(() => 8)
      }
    }
  }
})

const renderComponent = () => render(<Header />)

describe('Header', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should match the snapshot if the team-menu is open', () => {
    const {container, getByRole} = renderComponent()
    const combobox = getByRole('combobox')
    fireEvent.input(combobox, {target: {value: 'O'}})
    expect(container.firstChild).toMatchSnapshot()
  })
})
