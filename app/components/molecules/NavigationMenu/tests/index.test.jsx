import {act, fireEvent, waitFor} from '@testing-library/react'
import {omit} from 'lodash'

import {history} from '@/configure-store'
import render from '@/utils/test-utils/custom-render'

import NavigationMenuItem from '../Item'
import NavigationMenu from '../index'

const defaultProps = {
  children: <NavigationMenuItem>navigationMenuItem</NavigationMenuItem>,
  menuButton: props => <button {...omit(props, 'isOpen')}>menuButton</button>
}

const options = {wrapperProps: {hasRouter: true}}
const renderComponent = props =>
  render(<NavigationMenu {...defaultProps} {...props} />, options)

describe('NavigationMenu', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    fireEvent.mouseEnter(container.firstChild)
    expect(document.body).toMatchSnapshot()
  })

  it('should open on arrow down key press', () => {
    const {getByText, queryByText} = renderComponent()
    const button = getByText('menuButton')

    expect(queryByText('navigationMenuItem')).not.toBeInTheDocument()
    fireEvent.keyDown(button, {code: 'ArrowDown'})
    expect(queryByText('navigationMenuItem')).toBeInTheDocument()
  })

  it('should not open on another key press', () => {
    const {getByText, queryByText} = renderComponent()
    const button = getByText('menuButton')

    fireEvent.keyDown(button, {code: 'Enter'})
    expect(queryByText('navigationMenuItem')).not.toBeInTheDocument()
  })

  it('should close menu on button mouse leave', () => {
    const {getByText, getByRole} = renderComponent()
    const button = getByText('menuButton')

    fireEvent.mouseEnter(button)
    expect(getByRole('menu')).toBeInTheDocument()
    fireEvent.mouseLeave(button)
    expect(getByRole('menu')).toHaveClass('szh-menu--state-closing')
  })

  it('should not close menu on button mouse leave when hovering the menu', () => {
    const {getByText, getByRole} = renderComponent()
    const button = getByText('menuButton')

    fireEvent.mouseEnter(button)
    expect(getByRole('menu')).toBeInTheDocument()
    fireEvent.mouseLeave(button, {
      relatedTarget: getByText('navigationMenuItem')
    })
    expect(getByRole('menu')).not.toHaveClass('szh-menu--state-closing')
  })

  it('should close menu on menu mouse leave', () => {
    const {getByText, getByRole} = renderComponent()
    const button = getByText('menuButton')

    fireEvent.mouseEnter(button)
    const menu = getByRole('menu')

    expect(menu).toBeInTheDocument()
    fireEvent.mouseLeave(menu)
    expect(menu).toHaveClass('szh-menu--state-closing')
  })

  it('should not close menu on menu mouse leave when hovering the button', () => {
    const {getByText, getByRole} = renderComponent()
    const button = getByText('menuButton')

    fireEvent.mouseEnter(button)
    const menu = getByRole('menu')

    expect(menu).toBeInTheDocument()
    fireEvent.mouseLeave(menu, {relatedTarget: button})
    expect(menu).not.toHaveClass('szh-menu--state-closing')
  })

  it('should focus menu button on close if opened via keyboard', () => {
    const {getByText, getByRole} = renderComponent()
    const button = getByText('menuButton')

    fireEvent.keyDown(button, {code: 'ArrowDown'})
    const menu = getByRole('menu')

    fireEvent.keyDown(menu, {code: 'Escape', key: 'Escape'})
    expect(menu).toHaveClass('szh-menu--state-closing')
    expect(document.activeElement).toBe(button)
  })

  describe('Item', () => {
    it('should trigger Link click on enter key up', async () => {
      const linkPath = '/foo'
      const {getByText, getByRole} = renderComponent({
        children: (
          <NavigationMenuItem to={linkPath}>
            navigationMenuItem
          </NavigationMenuItem>
        )
      })
      fireEvent.mouseEnter(getByText('menuButton'))
      const menuItem = getByRole('menuitem')

      fireEvent.keyUp(menuItem, {code: 'Enter'})
      await waitFor(() => expect(history.location.pathname).toBe(linkPath))
      act(() => {
        history.push('/')
      })
    })

    it('should not trigger Link click on disabled item', () => {
      const {getByText, getByRole} = renderComponent({
        children: (
          <NavigationMenuItem isDisabled>navigationMenuItem</NavigationMenuItem>
        )
      })
      fireEvent.mouseEnter(getByText('menuButton'))
      const menuItem = getByRole('menuitem')
      const link = getByText('navigationMenuItem')
      link.onclick = jest.fn()

      fireEvent.keyUp(menuItem, {code: 'Enter'})
      expect(link.onclick).not.toHaveBeenCalled()
    })

    it('should disable link', () => {
      const {getByText} = renderComponent({
        children: (
          <NavigationMenuItem to="/foo" isDisabled>
            navigationMenuItem
          </NavigationMenuItem>
        )
      })
      fireEvent.mouseEnter(getByText('menuButton'))
      const link = getByText('navigationMenuItem')
      expect(link).not.toHaveAttribute('href')
      expect(link).toHaveAttribute('aria-disabled', 'true')
    })
  })
})
