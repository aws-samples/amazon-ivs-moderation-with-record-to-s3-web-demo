import React from 'react'
import { GridLeft, GridRight, BoxTop, BoxBottom } from './styled'
import { Grid, Typography } from '@material-ui/core'
import { Authenticator } from 'aws-amplify-react'

import svg1 from '../../assets/login-1.svg'
import svg2 from '../../assets/login-2.svg'
import colors from '../../theme/colors'
import './styles.css'

const MyTheme = {
  formSection: {
  },
  sectionHeaderContent: {
    fontSize: '2.6rem',
    fontWeight: '800',
    color: 'white',
    lineHeight: '3.1rem'
  },
  sectionBody: {
    margin: '4rem 0 2rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    width: '100%',
  },
  formField: {
    marginBottom: '1.6rem',
  },
  inputLabel: {
    color: 'white',
    fontSize: '1.7rem',
    marginBottom: '1.6rem',
  },
  input: {
    width: '100%',
    borderRadius: '0.6rem',
    fontSize: '1.5rem',
    padding: '1.2rem 1.4rem',
    color: colors.black,
    border: 'none',
    filter: 'none',
  },
  a: {
    fontWeight: 'bold',
    cursor: 'pointer',
    paddingLeft: '0.5rem',
    color: colors.primary,
  },
  container: {
    maxWidth: '45rem',
    width: '100%',
  },
  sectionFooter: {
    width: '100%',
  },
  sectionFooterPrimaryContent: {
    display: 'flex',
  },
  button: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    backgroundColor: colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: '0.6rem',
    height: '4.2rem',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: '0.3s',
  },
  selectInput: {
      'display': 'grid',
      gridTemplateColumns: 'auto 1fr',
      'gridGap': '1rem',
      color: colors.black,
  },
  hint: {
    color: 'white',
    fontSize: '1.5rem',
    marginTop: '1rem'
  },
  sectionFooterSecondaryContent: {
      'display': 'flex',
      'margin': '1rem 0 0 0',
      'color': 'white',
      fontSize: '1.5rem'
  },
  toast: {
    color: colors.alert,
    fontSize: '1.3rem',
    width: '100%',
  }
}

const Authentication = ({ handleAuthStateChange }) => {
  return (
    <Grid container style={{ height: '100vh' }}>
      <GridLeft item={true} xs={12} md={5} lg={4}>
        <Typography variant="h1">Moderation with Rekognition</Typography>
        <BoxBottom>
          <img alt="login background 1" src={svg1} />
        </BoxBottom>
        <BoxTop>
          <img alt="login background 2" src={svg2} />
        </BoxTop>
      </GridLeft>
      <GridRight item={true} xs={12} md={7} lg={8} className="Button__hovered">
        <Authenticator theme={MyTheme} onStateChange={handleAuthStateChange}/>
      </GridRight>
    </Grid>
  )
}

export default Authentication