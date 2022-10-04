import Button, {BUTTON_TYPES} from '@/components/atoms/Button/index'
import UploadIcon from '@/components/atoms/Icon/Upload'

import ButtonGroupComponent from '../index'

const ButtonGroup = props => (
  <ButtonGroupComponent {...props}>
    <Button startIcon={<UploadIcon />} />
    <Button startIcon={<UploadIcon />} />
    <Button startIcon={<UploadIcon />} />
  </ButtonGroupComponent>
)
ButtonGroup.args = {
  isDisabled: false,
  type: BUTTON_TYPES.CONTAINED
}

export {ButtonGroup}
export default {
  argTypes: {
    isDisabled: {
      control: {type: 'boolean'}
    },
    type: {
      control: {type: 'select'},
      options: Object.values(BUTTON_TYPES)
    }
  },
  component: ButtonGroupComponent,
  title: 'Design System/molecules/Button Group'
}
