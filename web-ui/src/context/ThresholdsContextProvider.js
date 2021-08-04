import React from 'react'
import ThresholdsContext from './ThresholdsContext'

export const SET_MODERATION_THRESHOLDS = 'SET_MODERATION_THRESHOLDS'
export const SET_INITIAL_MODERATION_THRESHOLDS = 'SET_INITIAL_MODERATION_THRESHOLDS'

const initialState = {
    moderationThresholds: null,
    backendModerationThresholds: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_MODERATION_THRESHOLDS:
            return {
                ...state,
                moderationThresholds: action.moderationThresholds,
            }
        case SET_INITIAL_MODERATION_THRESHOLDS:
            return {
                ...state,
                backendModerationThresholds: action.moderationThresholds,
                moderationThresholds: action.moderationThresholds,
            }
        default:
            throw new Error('unexpected action type');
    }
};

const ThresholdsContextProvider = ({ children }) => {
    const value = React.useReducer(reducer, initialState);
    return (
        <ThresholdsContext.Provider value={value}>
            {children}
        </ThresholdsContext.Provider>
    );
};

export default ThresholdsContextProvider