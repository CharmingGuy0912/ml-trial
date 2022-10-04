import {ReactComponent} from '@material-icons/svg/svg/my_location/round.svg'

import Icon from './index'

// istanbul ignore next
const MyLocationIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default MyLocationIcon
