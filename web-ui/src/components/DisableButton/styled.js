import { makeStyles } from "@material-ui/core"
import colors from '../../theme/colors.js'

const disableButtonStyles = makeStyles({
  root: {
    fontSize: '1.3rem',
    fontWeight: '500',
    textTransform: 'unset',
    height: 'unset',
    minWidth: 'unset',
    width: 'unset',
    transition: '0.2s color',
    '&:hover': {
      color: colors.secondary,
    },
    '&:focus': {
      border: 'none'
    },
  
    '&[name="alert"]': {
      marginRight: '0.4rem'
    },
    '&[name="terminate"]': {
      marginLeft: '0.4rem'
    }
  },
  label: {
    color: props => props.isDisabled ? colors.gray400 : colors.gray100,
    '&:hover': {
      color: colors.secondary,
    },
    transition: '0.2s color'
  }
});

export { disableButtonStyles }