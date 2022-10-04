import {ReactComponent} from '@material-icons/svg/svg/upload/round.svg'

import Icon from './index'

// istanbul ignore next
const UploadIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default UploadIcon
