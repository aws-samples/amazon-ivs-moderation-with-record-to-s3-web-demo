import { styled } from '@material-ui/core/styles'
import {  Box, Button } from '@material-ui/core'
import colors from '../../theme/colors'

const WrapperOuter = styled('div')(({ theme }) => ({
  overflowY: 'scroll',
  marginTop: '5rem',
  height: 'calc(100vh - 5rem)',
  position: 'relative', 
  scrollbarWidth: '0.8rem',
  [theme.breakpoints.up('sm')]: {
    overflowY: 'overlay',
  }
}))

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: colors.gray800,
  padding: '0.6rem 1.5rem',
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  zIndex: '200',
  [theme.breakpoints.up('md')]: {
    zIndex: '10',
    left: '30rem',
  }
}))

const StyledButton = styled(Button)(({ width }) => ({
    backgroundColor: colors.gray400,
    borderRadius: '0.6rem',
    border: 0,
    color: colors.secondary,
    height: '3.8rem',
    width: width,
    minWidth: width,
    marginLeft: '1.4rem',
    fontSize: '1.4rem',
    '&:hover': {
      backgroundColor: colors.primary
    }
}));

const WrapperInner = styled(Box)({
  margin: '0 auto',
  height: 'calc(100vh - 5rem)',
})

const MenuButton = styled(StyledButton)(({ theme }) => ({
  opacity: '1',
  minWidth: '5.4rem',
  backgroundColor: colors.gray400,
  position: 'relative',
  marginLeft: '0',
  '&:focus': {
    backgroundColor: colors.gray400
  },
  [theme.breakpoints.up("md")]: {
    opacity: '0',
    cursor: 'unset'
  }
}))

const NotificationIcon = styled('div')({
  position: 'absolute',
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '1rem',
  backgroundColor: colors.primary,
  top: '0.5rem',
  right: '0.5rem',
  border: `0.2rem solid ${colors.gray400}`,
})

export  {
  StyledButton,
  Header,
  WrapperInner,
  MenuButton,
  NotificationIcon,
  WrapperOuter
}