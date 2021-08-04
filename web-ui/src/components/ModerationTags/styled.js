import { Button, styled } from "@material-ui/core"
import colors from '../../theme/colors.js'

const ModerationTag = styled(Button)({
  backgroundColor: colors.gray400,
  border: 'none',
  color: colors.secondary,
  fontSize: '1.4rem',
  marginRight: '1rem',
  marginBottom: '1rem',
  padding: '0.6rem 1.5rem',
  borderRadius: '1.6rem',
  textTransform: 'unset',
  height: '2.9rem',
  '&:hover': {
    backgroundColor: colors.primary,
  },
  '&:focus': {
    backgroundColor: colors.primary,
    border: 'none',
  },
})

export {
  ModerationTag
}