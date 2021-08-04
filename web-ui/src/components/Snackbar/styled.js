import { styled } from "@material-ui/core"
import colors from '../../theme/colors'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = styled(MuiAlert)({
  height: '4.6rem',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  backgroundColor: colors.green,
  fontSize: '1.4rem',
  fontWeight: '600',
  color: colors.black
})

export {
  Alert
}