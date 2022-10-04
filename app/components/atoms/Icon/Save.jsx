import {ReactComponent} from '@material-icons/svg/svg/save/round.svg'

import Icon from './index'

// istanbul ignore next
const SaveIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default SaveIcon
