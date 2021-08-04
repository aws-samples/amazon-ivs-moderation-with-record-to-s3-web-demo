import React from 'react'
import ChannelsContext from './ChannelsContext'

export const SET_CHANNELS = 'SET_CHANNELS'
export const SET_SELECTED_CHANNEL_INDEX = 'SET_SELECTED_CHANNEL_INDEX'

const initialState = {
  channels: null,
  selectedChannelIndex: 0,
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_CHANNELS:
            return {
                ...state,
                channels: action.channels,
            }
        case SET_SELECTED_CHANNEL_INDEX:
            return {
                ...state,
                selectedChannelIndex: action.selectedChannelIndex,
            }
        default:
            throw new Error('unexpected action type');
    }
};

const ChannelsContextProvider = ({ children }) => {
    const value = React.useReducer(reducer, initialState);
    return (
        <ChannelsContext.Provider value={value}>
            {children}
        </ChannelsContext.Provider>
    );
};

export default ChannelsContextProvider