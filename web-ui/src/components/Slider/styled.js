import { styled } from "@material-ui/core"
import colors from '../../theme/colors'

const Container = styled('div')({
  position: 'relative',
	width: '100%',
})

const Input = styled('input')({
  position: 'absolute',
	pointerEvents: 'none',
  WebkitAppearance: 'none',
	zIndex: '2',
	height: '2.8rem',
	width: '100%',
	opacity: '0',
  top: '-1.6rem',
  fontSize: '1.2rem',
  appearance: 'none',
  outlineWidth: '0',
  
  '&::-webkit-slider-thumb': {
    pointerEvents: 'all',
    cursor: 'pointer',
    width: '3.6rem',
    height: '2.8rem',
    borderRadius: '1.6rem',
    border: '0 none',
    backgroundColor: 'red',
    zIndex: '14141',
    WebkitAppearance: 'none',
    outline: 'none',
  },

  '&::-moz-range-thumb': {
    pointerEvents: 'all',
    cursor: 'pointer',
    width: '3.6rem',
    height: '2.8rem',
    borderRadius: '1.6rem',
    border: '0 none',
    backgroundColor: 'red',
    zIndex: '14141', 
    MozAppearance: 'none',
    outline: 'none',
  }

})

const Slider = styled('div')({
	position: 'relative',
	zIndex: '1',
	height: '0.2rem',
	margin: '0 1.5rem',
})

const Track = styled('div')({
  position: 'absolute',
	zIndex: '1',
	left: '0',
	right: '0',
	top: '0',
	bottom: '0',
	borderRadius: '0.5rem',
	backgroundColor: colors.gray400,
})

const Range = styled('div')({
  position: 'absolute',
	zIndex: '2',
	top: '0',
	bottom: '0',
	borderRadius: '0.5rem',
	backgroundColor: colors.primary,
})

const Thumb = styled('div')({
	position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
	zIndex: '3',
  fontSize: '1.2rem',
	width: '3.6rem',
	height: '2.8rem',
	borderRadius: '1.6rem',
	boxShadow: '0 0 0 0 rgba(98,0,238,.1)',
	transition: 'box-shadow .3s ease-in-out',
  '&:hover': {
    boxShadow: '0 0 0 2rem rgba(98,0,238,.1)',
  },
  '&:active': {
    boxShadow: '0 0 0 4rem rgba(98,0,238,.2)',
  },
})

const ThumbLeft = styled(Thumb)({
  transform: 'translate(-1.5rem, -1.4rem)',
	backgroundColor: colors.primary,
})

const ThumbRight = styled(Thumb)({
  transform: 'translate(-1.5rem, -1.4rem)',
  backgroundColor: colors.darkRed,
})


export {
  Container,
  Input,
  Slider,
  Track,
  Range,
  ThumbLeft,
  ThumbRight
}