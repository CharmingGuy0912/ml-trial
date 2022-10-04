import UploadIcon from '../Upload'
import IconComponent from '../index'

const Template = props => <UploadIcon {...props} />

const Icon = Template.bind({})
Icon.args = {
  className: 'text-primary text-[24px]'
}

export {Icon}
export default {
  component: IconComponent,
  title: 'Design System/atoms/Icon'
}
