import TagComponent, {TAG_COLORS} from '@/components/atoms/Tag'

const Template = props => <TagComponent {...props} />

const Tag = Template.bind({})
Tag.args = {
  children: '12:00',
  color: TAG_COLORS.GRAY
}

export {Tag}
export default {
  argTypes: {
    children: {
      control: {type: 'text'}
    },
    color: {
      control: {type: 'select'},
      options: Object.values(TAG_COLORS)
    },
    title: {
      control: {type: 'text'}
    }
  },
  component: TagComponent,
  title: 'Design System/atoms/Tag'
}
