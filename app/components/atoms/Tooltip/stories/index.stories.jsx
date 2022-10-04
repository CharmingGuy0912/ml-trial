import TooltipComponent, {TOOLTIP_SIZES} from '../index'

const Template = props => <TooltipComponent {...props} />
const Tooltip = Template.bind({})
Tooltip.args = {
  children: <span className="bg-white p-2">Tooltip Trigger</span>,
  className: 'm-4',
  size: TOOLTIP_SIZES.MEDIUM,
  title: 'Tooltip Content'
}

export {Tooltip}
export default {
  argTypes: {
    size: {
      control: {type: 'select'},
      options: Object.values(TOOLTIP_SIZES)
    }
  },
  component: TooltipComponent,
  title: 'Design System/atoms/Tooltip'
}
