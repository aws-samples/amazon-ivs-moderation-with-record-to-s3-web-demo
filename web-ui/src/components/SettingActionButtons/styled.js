import { Grid, styled } from "@material-ui/core"
import colors from '../../theme/colors'

const ButtonGrid= styled(Grid)({
  backgroundColor: colors.gray900,
  width: 'unset',
  padding: '1.5rem',
  borderRadius: '1.6rem',
  boxShadow: '0 0.4rem 1rem rgba(0, 0, 0, 0.05)'
})

const FormControlButton = styled('button')((props) => ({
  cursor: 'pointer',
  backgroundColor: props.bgcolor,
  color: props.fontcolor,
  width: '15.1rem',
  height: '4.2rem',
  fontSize: '1.4rem',
  fontWeight: '600',
  textTransform: 'none',
  transition: '0.3s all',
  opacity: '1',
  border: 'none',
  borderRadius: '0.6rem',
  marginRight: props.mright,

  '&:hover': { 
    opacity: '0.8'
  },
}))

export {
  ButtonGrid,
  FormControlButton
}