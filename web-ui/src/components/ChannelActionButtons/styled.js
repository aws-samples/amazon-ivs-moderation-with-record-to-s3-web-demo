import { Box, Grid, makeStyles, styled } from "@material-ui/core"
import colors from "../../theme/colors"

const ButtonGrid = styled(Grid)({
  backgroundColor: colors.primary,
  width: 'unset',
  padding: '1.2rem',
  borderRadius: '1.6rem',
  boxShadow: '0 0.4rem 1rem rgba(0, 0, 0, 0.05)',
  background: "linear-gradient(104.48deg, rgba(101, 8, 145, 0.3) -1.61%, rgba(19, 56, 151, 0) 73.97%), #008CF6",
})

const useButtonStyles = makeStyles(theme => ({
  root: {
    marginRight: props => props.mright,
    backgroundColor: 'rgba(255,255,255, 0.3)',
    transition: '0.3s background-color',
    width: '13rem',
    height: '7.2rem',
    borderRadius: '1.2rem',
    '&:hover': {
      backgroundColor: props => props.hovercolor,
    },

    [theme.breakpoints.up("sm")]: {
      width: '15rem',
    },
    },
  label: {
    display: 'flex',
    flexDirection: 'column',
  }
}))

const ChannelActionButtonContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: "calc(100% - 30rem)",
  },
}))

export {
  ButtonGrid,
  useButtonStyles,
  ChannelActionButtonContainer
}