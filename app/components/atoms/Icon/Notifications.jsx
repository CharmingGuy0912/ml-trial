import {ReactComponent} from '@material-icons/svg/svg/notifications/round.svg'

import Icon from './index'

// istanbul ignore next
const NotificationsIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default NotificationsIcon
