import {ReactComponent} from '@material-icons/svg/svg/info/round.svg'

import Icon from './index'

// istanbul ignore next
const InfoIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default InfoIcon
