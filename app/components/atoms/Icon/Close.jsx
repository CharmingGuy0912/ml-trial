import {ReactComponent} from '@material-icons/svg/svg/close/round.svg'

import Icon from './index'

// istanbul ignore next
const CloseIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default CloseIcon
