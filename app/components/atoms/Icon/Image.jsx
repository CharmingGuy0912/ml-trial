import {ReactComponent} from '@material-icons/svg/svg/image/round.svg'

import Icon from './index'

// istanbul ignore next
const ImageIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default ImageIcon
