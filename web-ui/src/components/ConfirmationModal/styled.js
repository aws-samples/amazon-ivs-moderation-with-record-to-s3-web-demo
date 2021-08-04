import { Button, Modal, Paper, styled } from "@material-ui/core"
import colors from "../../theme/colors"

const ModalOuter = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 5rem)',
  outline: 'none',
})

const ModalContent = styled(Paper)(({ theme }) => ({
  width: 'calc(100vw - 4rem)',
  height: '28rem',
  padding: '4.8rem 3.3rem 3rem',
  backgroundColor: colors.gray800,
  color: colors.secondary,
  display: 'flex',
  borderRadius: '1.8rem',
  flexDirection: 'column',
  justifyContent: 'space-between',
  outline: 'none',

  [theme.breakpoints.up("sm")]: {
    width: '52.2rem',
    height: '23rem',
  },
}))

const ActionButton = styled(Button)(({ bgcolor, mright, hovercolor }) => ({
  width: '22.3rem',
  height: '4.2rem',
  backgroundColor: bgcolor,
  borderRadius: '0.6rem',
  display: 'flex',
  marginRight: mright,
  transition: '0.3s background',
  '&:hover': {
    backgroundColor: hovercolor
  }
}))

export {
  ModalOuter,
  ModalContent,
  ActionButton
}
