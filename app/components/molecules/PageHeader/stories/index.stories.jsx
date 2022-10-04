import Button, {BUTTON_TYPES} from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

import PageHeaderComponent from '..'

const Template = props => <PageHeaderComponent {...props} />
const PageHeader = Template.bind({})
PageHeader.args = {
  centerSlot: <Input placeholder="centerSlot" />,
  leftSlot: <Button type={BUTTON_TYPES.OUTLINED}>leftSlot</Button>,
  rightSlot: <Button type={BUTTON_TYPES.CONTAINED}>rightSlot</Button>,
  title: 'Title'
}

export {PageHeader}
export default {
  component: PageHeaderComponent,
  title: 'Design System/molecules/Page Header'
}
