import { createMuiTheme } from "@material-ui/core/styles"
import colors from "./colors"

const fontFamily = [
  'Inter',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Open Sans',
  'Helvetica Neue',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol'
]

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: fontFamily.join(','),
    h1: {
      fontSize: '4.6rem',
      fontWeight: '800'
    },
    h2: {
      fontSize: '2.7rem',
      fontWeight: '900',
      letterSpacing: '0.5px'
    },
    h3: {
      fontSize: '1.8rem',
    },
    h4: {
      fontSize: '1.6rem',
    },
    h5: {
      fontSize: '1.4rem',
      fontWeight: '600'
    },
    p: {
      fontSize: '1.4rem',
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          color: 'white',
          fontSize: '10px',
          fontFamily: fontFamily.join(','),
          overflowX: 'hidden'
        },
        body: {
          color: 'white',
          fontFamily: fontFamily.join(','),
          overflowX: 'hidden'
        },
        select: {
          color: colors.black,
          borderRadius: '0.6rem',
          background: 'white',
          paddingLeft: '1rem',
          border: 'none',
        },
        '*::-webkit-scrollbar': {
          width: '0.8em',
          zIndex: 1000,
          position: 'relative',
          '&:hover': {
            width: '0.8rem',
          }
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'unset',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: colors.gray100,
          outline: 'unset',
          borderRadius: '0.4rem',
          zIndex: 1000,
          position: 'relative',
          '&:hover': {
            width: '0.8rem'
          }
        },
        "*::-webkit-scrollbar-thumb:hover": {
          width: '0.8em',
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            '-webkit-box-shadow': 'unset',
          },
        }
      },
    },
    MuiButton:{
      root: {
        fontSize: '1.4rem',
        letterSpacing: 'unset',
        textTransform: 'unset'
      },
      label: {
        color: colors.secondary
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(14, 20, 26, 0.9)'
      }
    }
  },
})

export default theme
