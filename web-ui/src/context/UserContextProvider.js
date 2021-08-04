import React from 'react'
import UserContext from './UserContext'

export const SET_USER = 'SET_USER'

const initialState = { userData: null }

const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                userData: action.userData,
            }
        default:
            throw new Error('unexpected action type')
    }
};

const UserContextProvider = ({ children }) => {
    const value = React.useReducer(reducer, initialState)
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider