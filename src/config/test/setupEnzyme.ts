import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

export const shallowWithStore = (component: React.ReactElement<any>, store: any) => {
  const context = {
    store,
  }
  return shallow(component, { context })
}
