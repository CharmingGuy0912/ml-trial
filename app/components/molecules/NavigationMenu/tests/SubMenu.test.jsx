import {act, fireEvent, waitFor} from '@testing-library/react'
import {omit} from 'lodash'

import {history} from '@/configure-store'
import render from '@/utils/test-utils/custom-render'

import NavigationMenuItem from '../Item'
import NavigationSubMenu from '../SubMenu'
import NavigationMenu from '../index'

const options = {wrapperProps: {hasRouter: true}}
const renderComponent = props =>
  render(
    <NavigationMenu
      menuButton={menuButtonProps => (
        <button {...omit(menuButtonProps, 'isOpen')}>menuButton</button>
      )}
    >
      <NavigationSubMenu label="navigationSubMenu" {...props}>
        <NavigationMenuItem>navigationMenuItem</NavigationMenuItem>
      </NavigationSubMenu>
    </NavigationMenu>,
    options
  )

describe('NavigationMenu', () => {
  describe('NavigationSubMenu', () => {
    it('should match the snapshot', () => {
      const {container} = renderComponent()
      fireEvent.mouseEnter(container.firstChild)
      expect(document.body).toMatchSnapshot()
    })

    it('should disable label link', () => {
      const {getByText} = renderComponent({isLabelDisabled: true})
      fireEvent.mouseEnter(getByText('menuButton'))
      const link = getByText('navigationSubMenu')
      expect(link).not.toHaveAttribute('href')
      expect(link).toHaveAttribute('aria-disabled', 'true')
    })

    it('should trigger Link click and close menu on enter key up', async () => {
      const to = '/foo'
      const {getByText, getByRole} = renderComponent({to})
      fireEvent.mouseEnter(getByText('menuButton'))
      const menuItem = getByRole('menuitem')

      fireEvent.keyUp(menuItem, {code: 'Enter'})
      await waitFor(() => expect(history.location.pathname).toBe(to))
      expect(getByRole('menu')).toHaveClass('szh-menu--state-closing')
      act(() => history.push('/'))
    })

    it('should not trigger Link click or close menu on disabled label', () => {
      const {getByText, getByRole} = renderComponent({isLabelDisabled: true})
      fireEvent.mouseEnter(getByText('menuButton'))
      const menuItem = getByRole('menuitem')
      const link = getByText('navigationSubMenu')
      link.onclick = jest.fn()

      fireEvent.keyUp(menuItem, {code: 'Enter'})
      expect(link.onclick).not.toHaveBeenCalled()
    })

    it('should open submenu on arrow right key up', () => {
      const {getByText, queryByText, getByRole} = renderComponent()
      fireEvent.mouseEnter(getByText('menuButton'))

      expect(queryByText('navigationMenuItem')).not.toBeInTheDocument()
      fireEvent.keyUp(getByRole('menuitem'), {code: 'ArrowRight'})
      expect(queryByText('navigationMenuItem')).toBeInTheDocument()
    })

    it('should open submenu on label mouse enter', () => {
      const {getByText, queryByText, getByRole} = renderComponent()
      fireEvent.mouseEnter(getByText('menuButton'))

      expect(queryByText('navigationMenuItem')).not.toBeInTheDocument()
      fireEvent.mouseEnter(getByRole('menuitem'))
      expect(queryByText('navigationMenuItem')).toBeInTheDocument()
    })
  })
})
