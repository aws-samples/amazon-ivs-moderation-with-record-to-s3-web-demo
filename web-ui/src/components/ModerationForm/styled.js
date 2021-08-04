import { Box, Button, styled, Typography } from '@material-ui/core'
import colors from '../../theme/colors.js'

const SliderWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: colors.gray700,
  padding: '0.6rem 0.4rem',
  [theme.breakpoints.up('sm')]: {
    padding: '0.6rem 1rem',
  }
}))

const CategoryBlock = styled('div')(({ theme }) => ({
  backgroundColor: colors.gray900,
  borderRadius: '1.8rem',
  padding: '2rem 1.6rem 1rem 1.6rem',
  marginBottom: '2rem',
  [theme.breakpoints.up('sm')]: {
    padding: '2.2rem 2.2rem 1rem 2.2rem',
  }
}))

const Title = styled(Typography)({
  fontWeight: 700,
  paddingBottom: '4rem',
})

const ResetButtonWrapper = styled(Box)(({ theme }) => ({
  marginBottom: "18.6rem",
  marginTop: "2.4rem",
  [theme.breakpoints.up('sm')]: {
    marginBottom: "9rem",
    marginTop: "5rem",
  }
}))

const ResetButton = styled(Button)({
  height: '4.2rem',
  width: '15rem',
  color: colors.secondary,
  backgroundColor: colors.gray400,
  transition: '0.3s background',
  '&:hover': {
    backgroundColor: colors.primary
  }
})

export {
  Title,
  SliderWrapper,
  CategoryBlock,
  ResetButton,
  ResetButtonWrapper
}