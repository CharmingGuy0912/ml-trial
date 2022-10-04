import {ReactComponent} from '@material-icons/svg/svg/videocam/round.svg'

import Icon from './index'

// istanbul ignore next
const VideoIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default VideoIcon
