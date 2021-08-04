import { Button, styled } from "@material-ui/core"
import colors from '../../theme/colors'

const ThumbnailLink = styled(Button)(({ isactive }) => ({
  height: '7.8rem',
  borderRadius: '0.6rem',
  backgroundColor: isactive ? colors.gray400 : 'transparent',
  textTransform: 'unset',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: colors.gray400
  }
}))

const ThumbnailImage = styled('img')({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
})

const ThumbnailTitle = styled('p')({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: '1rem',
  top: '50%',
})

export {
  ThumbnailLink,
  ThumbnailTitle,
  ThumbnailImage
}
