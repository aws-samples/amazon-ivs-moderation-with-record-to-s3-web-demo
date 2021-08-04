import { styled } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import colors from '../../theme/colors'

const GridLeft = styled(Grid)(({ theme }) => ({
  backgroundColor: colors.gray600,
  position: 'relative',
  color: 'white',
  padding: '4rem 2rem',  
  overflow: 'hidden',

  [theme.breakpoints.up("md")]: {
    padding: '6rem 4rem',  
  }
}))

const GridRight = styled(Grid)({
  backgroundColor: colors.gray800,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4rem 2rem'
})

const BoxBottom = styled(Box)({
  position: 'absolute',
  bottom: '0',
  left: '0',
})

const BoxTop = styled(Box)({
  position: 'absolute',
  top: '0',
  right: '0',
})

export {
  GridLeft,
  GridRight,
  BoxBottom,
  BoxTop,
}