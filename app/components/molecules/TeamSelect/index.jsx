import classNames from 'classnames'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'

import ComboBox, {COMBO_BOX_PROP_TYPES} from '@/components/atoms/ComboBox'
import SelectControl from '@/components/molecules/TeamSelect/components/SelectControl'
import SelectIndicator from '@/components/molecules/TeamSelect/components/SelectIndicator'
import SelectInput from '@/components/molecules/TeamSelect/components/SelectInput'
import SelectMenu from '@/components/molecules/TeamSelect/components/SelectMenu'
import SelectMenuList from '@/components/molecules/TeamSelect/components/SelectMenuList'
import SelectValue from '@/components/molecules/TeamSelect/components/SelectValue'

const TeamSelect = ({className, ...props}) => (
  <ComboBox
    className={classNames('specific:w-fit', className)}
    components={{
      Control: SelectControl,
      DropdownIndicator: SelectIndicator,
      Input: SelectInput,
      Menu: SelectMenu,
      MenuList: SelectMenuList,
      SingleValue: SelectValue
    }}
    isDisabled={props.isDisabled}
    placeholder={props.placeholder}
    onChange={props.onChange}
    options={props.options}
    value={props.value}
  />
)

TeamSelect.propTypes = {
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(COMBO_BOX_PROP_TYPES.OPTION),
  placeholder: PropTypes.string,
  value: COMBO_BOX_PROP_TYPES.OPTION
}

TeamSelect.defaultProps = {
  className: null,
  isDisabled: false,
  onChange: noop,
  options: [],
  placeholder: null,
  value: null
}

export default TeamSelect
