import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import './configs/config'
import HomePage from './components/HomePage'
import PrivateRoute from './components/PrivateRoute'
import routes from './constants/routes'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme/theme'
import ThresholdsContextProvider from './context/ThresholdsContextProvider'
import UserContextProvider from './context/UserContextProvider'
import ChannelsContextProvider from './context/ChannelsContextProvider'

function App() {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <ChannelsContextProvider>
            <ThresholdsContextProvider>
              <Router>
                <Switch>
                  <PrivateRoute exact path={routes.HOME}>
                    <HomePage />
                  </PrivateRoute>
                </Switch>
              </Router>
            </ThresholdsContextProvider>
          </ChannelsContextProvider>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App