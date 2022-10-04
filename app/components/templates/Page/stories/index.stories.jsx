import PageComponent from '@/components/templates/Page'

const Template = props => <PageComponent footer={<div>Footer</div>} {...props} />

const Page = Template.bind({})
Page.args = {
  children: 'Page Content',
  className: 'p-4'
}

export {Page}
export default {
  argTypes: {
    children: {
      control: {type: 'text'}
    },
    className: {
      control: {type: 'text'}
    }
  },
  component: PageComponent,
  title: 'Design System/templates/Page'
}
