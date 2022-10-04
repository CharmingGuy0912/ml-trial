import {ReactComponent} from '@material-icons/svg/svg/play_circle/round.svg'

import Icon from './index'

// istanbul ignore next
const AudioIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default AudioIcon
