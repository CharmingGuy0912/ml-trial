import {ReactComponent} from '@material-icons/svg/svg/schedule/round.svg'

import Icon from './index'

// istanbul ignore next
const ScheduleIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default ScheduleIcon
