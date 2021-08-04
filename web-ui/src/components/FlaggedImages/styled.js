import { Box, styled } from "@material-ui/core"

const FlaggedImageList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridGap: '2.5rem',
  paddingBottom: '4rem',

  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  }
}))

const FlaggedImage = styled('img')({
  borderRadius: '0.8rem',
  width: '100%',
})

export {
  FlaggedImage,
  FlaggedImageList
}