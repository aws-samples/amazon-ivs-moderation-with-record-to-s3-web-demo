import { styled } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import colors from '../../theme/colors'

const Title = styled(Typography)({
  height: '5rem',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center'
})

const StreamNum = styled('span')({
  color: colors.primary,
  marginRight: '0.6rem'
})

const BoxLeft = styled(Box)(({ theme, ismenuopen }) => ({
  background: colors.gray900,
  display: ismenuopen ? 'block' : 'none',
  position: 'absolute',
  height: '100vh',
  width: '100vw',
  paddingTop: '8rem',
  zIndex: '102',

  [theme.breakpoints.up("md")]: {
    display: 'block',
    position: 'relative',
    width: '30rem',
    paddingTop: '0',
  }
}))

const BoxRight = styled(Box)(({ theme }) => ({
  background: colors.gray800,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    position: 'relative',
  }
}))

const ThumbnailBox = styled(Box)({
  padding: '1rem',
  background: 'transparent',
  display: 'flex',
})

const FlaggedCount = styled(Box)(({ theme }) => ({
  background: colors.gray400,
  whiteSpace: 'pre',
  marginTop: '2rem',
  fontSize: '1.4rem',
  
  [theme.breakpoints.up('md')]: {
    zIndex: '100',
    marginTop: '0',
  }
}))

const NoStreamsTitle = styled(Typography)({
  textAlign: 'center',
  marginTop: '1.8rem'
})

export {
  Title,
  StreamNum,
  BoxLeft,
  BoxRight,
  ThumbnailBox,
  FlaggedCount,
  NoStreamsTitle
}