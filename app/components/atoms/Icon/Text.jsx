import {ReactComponent} from '@material-icons/svg/svg/text_snippet/round.svg'

import Icon from './index'

// istanbul ignore next
const TextIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default TextIcon
