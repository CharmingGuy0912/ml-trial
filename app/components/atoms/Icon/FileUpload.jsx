import {ReactComponent} from '@material-icons/svg/svg/file_upload/round.svg'

import Icon from './index'

// istanbul ignore next
const FileUploadIcon = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props} component={ReactComponent} />
)

export default FileUploadIcon
