import {ReactComponent} from '@material-icons/svg/svg/person/round.svg'

import Icon from './index'

// istanbul ignore next
const PersonIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default PersonIcon
