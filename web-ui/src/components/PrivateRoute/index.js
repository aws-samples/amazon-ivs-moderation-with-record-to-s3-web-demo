/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import Authentication from '../Authentication'
import { Hub, Auth } from 'aws-amplify'
import UserContext from '../../context/UserContext'
import { SET_USER } from '../../context/UserContextProvider'

const PrivateRoute = ({ children, ...rest }) => {
  
  const [{ userData }, dispatch] = useContext(UserContext)

  React.useEffect(() => {
    const setAuthListeners = async () => {
      Hub.listen('auth', ({ payload } ) => {
        if (payload.event === 'signIn') {
          dispatch({
            type: SET_USER,
            userData: payload.data,
          });
        } else if (payload.event === 'signOut') {
          dispatch({
            type: SET_USER,
            userData: null,
          });
        }
      });
      try {
        const user = await Auth.currentAuthenticatedUser();
        dispatch({
          type: SET_USER,
          userData: user,
        });
      } catch(e) {
        console.log(e)
      }
    }
    setAuthListeners();
  }, [])

  let componentToRender = children
  if(!userData) {
    componentToRender = <Authentication />
  }
  return (
    <Route {...rest} render={ () => componentToRender } />
  )   
}

export default PrivateRoute