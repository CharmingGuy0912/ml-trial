import {ReactComponent} from '@material-icons/svg/svg/place/round.svg'

import Icon from './index'

// istanbul ignore next
const PlaceIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default PlaceIcon
