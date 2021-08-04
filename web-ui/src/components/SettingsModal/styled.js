import { Box, Modal } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import colors from '../../theme/colors'

const ModalOuter = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  outline: 'none',
})

const ModalInner = styled('div')(({ theme }) => ({
  backgroundColor: colors.gray600,
  boxShadow: '0 0.4rem 2rem rgba(0, 0, 0, 0.25)',
  padding: '4rem 2rem 0 2rem',
  width: '64rem',
  height: 'calc(100vh - 7rem)',
  overflowY: 'scroll',
  borderRadius: '1.8rem',
  outline: 'unset',
  [theme.breakpoints.up('sm')]: {
    padding: '4.8rem 3.3rem 0 3.3rem',
  }
}))

const CloseButtonIcon = styled(Box)(({ matches }) => ({
  top: '4.4rem',
  right: matches ? 'calc((100vw - 64rem) / 2 + 1rem)' : '1.6rem'
}))

export {
  ModalInner,
  ModalOuter,
  CloseButtonIcon
}