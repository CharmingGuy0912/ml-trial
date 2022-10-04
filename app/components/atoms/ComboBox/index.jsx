import classNames from 'classnames'
import {omit} from 'lodash'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import React, {useCallback, useState} from 'react'
import ReactSelect from 'react-select'

import useSyncState from '@/hooks/use-sync-state'

import ClearIndicator from './components/ClearIndicator'
import Control from './components/Control'
import DropdownIndicator from './components/DropdownIndicator'
import IndicatorsContainer from './components/IndicatorsContainer'
import Input from './components/Input'
import Menu from './components/Menu'
import MenuList from './components/MenuList'
import MultiValueContainer from './components/MultiValueContainer'
import MultiValueLabel from './components/MultiValueLabel'
import MultiValueRemove from './components/MultiValueRemove'
import Option from './components/Option'
import Placeholder from './components/Placeholder'
import SingleValue from './components/SingleValue'
import ValueContainer from './components/ValueContainer'

const useMenuIsOpen = props => {
  const [menuIsOpen, setMenuIsOpen] = useState(props.defaultMenuIsOpen)

  const events = {
    onKeyDown: useCallback(
      event => {
        if (event.key === 'Escape' && menuIsOpen) {
          event.stopPropagation()
          events.onMenuClose()
        }
        props.onKeyDown?.(event, menuIsOpen)
      },
      [menuIsOpen, setMenuIsOpen, props.onKeyDown]
    ),

    onMenuClose: useCallback(() => {
      setMenuIsOpen(false)
      props.onMenuClose?.()
    }, [setMenuIsOpen, props.onMenuClose]),

    onMenuOpen: useCallback(() => {
      setMenuIsOpen(true)
      props.onMenuOpen?.()
    }, [setMenuIsOpen, props.onMenuOpen])
  }

  return [menuIsOpen, events]
}

const ComboBox = React.forwardRef((props, ref) => {
  const [value, setValue] = useSyncState(props.value)
  const [options] = useSyncState(props.options)
  const [menuIsOpen, menuIsOpenEvents] = useMenuIsOpen(props)

  const onChange = next => {
    setValue(next)
    props.onChange(next)
  }

  const passThroughProps = omit(props, [
    'className',
    'components',
    'onChange',
    'onKeyDown',
    'onMenuClose',
    'onMenuOpen',
    'options',
    'value'
  ])

  return (
    <ReactSelect
      ref={ref}
      className={classNames('text-base w-full', props.className)}
      options={options}
      onChange={onChange}
      value={value}
      menuIsOpen={menuIsOpen}
      onKeyDown={menuIsOpenEvents.onKeyDown}
      onMenuOpen={menuIsOpenEvents.onMenuOpen}
      onMenuClose={menuIsOpenEvents.onMenuClose}
      components={{
        ClearIndicator,
        Control,
        DropdownIndicator,
        IndicatorSeparator: null,
        IndicatorsContainer,
        Input,
        Menu,
        MenuList,
        MultiValueContainer,
        MultiValueLabel,
        MultiValueRemove,
        Option,
        Placeholder,
        SingleValue,
        ValueContainer,
        ...props.components
      }}
      {...passThroughProps}
    />
  )
})

ComboBox.displayName = 'ComboBox'

const IDENTIFIER_PROP_TYPE = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])
const OPTION = PropTypes.shape({
  label: PropTypes.string,
  node: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: IDENTIFIER_PROP_TYPE.isRequired
})
const COMBO_BOX_PROP_TYPES = {
  GROUPED_OPTION: PropTypes.shape({
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(OPTION)
  }),
  IDENTIFIER: IDENTIFIER_PROP_TYPE,
  OPTION
}

ComboBox.propTypes = {
  'aria-label': PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  components: PropTypes.object,
  getOptionLabel: PropTypes.func,
  hideSelectedOptions: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(COMBO_BOX_PROP_TYPES.OPTION),
    PropTypes.arrayOf(COMBO_BOX_PROP_TYPES.GROUPED_OPTION)
  ]),
  placeholder: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  value: PropTypes.oneOfType([
    COMBO_BOX_PROP_TYPES.OPTION,
    PropTypes.arrayOf(COMBO_BOX_PROP_TYPES.OPTION)
  ])
}

ComboBox.defaultProps = {
  'aria-label': null,
  autoFocus: false,
  className: null,
  components: {},
  // eslint-disable-next-line no-undefined
  getOptionLabel: undefined,
  hideSelectedOptions: false,
  isDisabled: false,
  isMulti: false,
  onChange: noop,
  options: [],
  placeholder: null,
  value: null
}

export {COMBO_BOX_PROP_TYPES}
export default ComboBox
