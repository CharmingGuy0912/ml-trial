import configureTestStore from '@/utils/test-utils/configure-test-store'
import render from '@/utils/test-utils/custom-render'

import App from '../App'

jest.mock('@/components/atoms/Theme', () => () => <div>Theme</div>)
jest.mock('@/components/pages/HomePage/Loadable', () => () => (
  <div>Home Page</div>
))
jest.mock('@/components/organisms/ReloadPrompt', () => () => (
  <div>Reload Prompt</div>
))
jest.mock('@faker-js/faker', () => {
  const originalModule = jest.requireActual('@faker-js/faker')
  return {
    ...originalModule,
    faker: {
      ...originalModule.faker,
      datatype: {
        number: jest.fn(() => 8)
      }
    }
  }
})

const {options} = configureTestStore()
const renderComponent = () => render(<App />, options)

describe('App', () => {
  it('should match the snapshot', async () => {
    const {container, findByText} = renderComponent()
    await findByText('Home Page')
    expect(container).toMatchSnapshot()
  })
})
