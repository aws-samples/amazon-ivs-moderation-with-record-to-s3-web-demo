import React, { useEffect, useState, useContext } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listChannels } from '../../graphql/queries'
import { Box } from '@material-ui/core'

import Wrapper from '../Wrapper'
import FlaggedImages from '../FlaggedImages'
import SettingsModal from '../SettingsModal'
import Snackbar from '../Snackbar'

import Thumbnail from '../Thumbnail'
import ChannelActionButtons from '../ChannelActionButtons'
import { BoxLeft, BoxRight, StreamNum, Title, FlaggedCount, NoStreamsTitle } from './styled'

import NoFlaggedImages from '../NoFlaggedImages'
import ChannelsContext from '../../context/ChannelsContext'
import { SET_CHANNELS, SET_SELECTED_CHANNEL_INDEX } from '../../context/ChannelsContextProvider'

const HomePage = () => {

  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [message, setMessage] = useState(null)

 const [{ channels, selectedChannelIndex }, dispatch] = useContext(ChannelsContext)

  const getChannels = async () => {
    try {
      // 1. The actual data that should be passed
      const channelsData = (await API.graphql(
        graphqlOperation(listChannels),
      ))

      // 2. Uncomment the lines below out to test No Channels
      // const channelsData = {
      //   "data": {
      //     "listChannelss": {
      //       "items": [],
      //       "nextToken": null
      //     }
      //   }
      // }

      // 3. Uncomment the lines below to test 1 channel only
      // const channelsData = {
      //   "data": {
      //     "listChannelss": {
      //       "items": [
      //         {
      //           "id": "arn:aws:ivs:us-west-2:150635757663:channel/pnOBmgfqbdOT",
      //           "playback_url": "https://053e3dc19af8.us-west-2.playback.live-video.net/api/video/v1/us-west-2.150635757663.channel.pnOBmgfqbdOT.m3u8",
      //           "time": "2021-06-18T23:28:21.079420",
      //           "flagged_images":[
      //             "https://d372avd287zhsq.cloudfront.net/ivs/v1/150635757663/pnOBmgfqbdOT/2021/6/18/23/20/EK2r858C0mmE/media/thumbnails/thumb8.jpg",
      //             "https://d372avd287zhsq.cloudfront.net/ivs/v1/150635757663/pnOBmgfqbdOT/2021/6/18/23/20/EK2r858C0mmE/media/thumbnails/thumb35.jpg",
      //             "https://d372avd287zhsq.cloudfront.net/ivs/v1/150635757663/pnOBmgfqbdOT/2021/6/18/23/20/EK2r858C0mmE/media/thumbnails/thumb50.jpg"
      //          ],
      //         }
      //       ],
      //     }
      //   }
      // }

      const channelsList = channelsData.data.listChannelss.items
      dispatch({
        type: SET_CHANNELS,
        channels: channelsList
      });

      if(channelsList.length === 0) {
        dispatch({
          type: SET_SELECTED_CHANNEL_INDEX,
          selectedChannelIndex: null
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getChannels();  
    const interval = setInterval(() => {
      getChannels();  
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  
  if(!channels) {
    return <div>Loading...</div>
  }

  return (
    <Box display="flex" height="100vh">

      <BoxLeft width="30rem" padding="0.5rem" ismenuopen={isMenuOpen ? 1 : 0}>
        {channels.length === 0 ? (
          <NoStreamsTitle variant="h5">No streams to review</NoStreamsTitle>
        ) : (
          <>
            <Title variant="h5">
              <StreamNum>{channels.length}</StreamNum>
              Stream{(channels.length === 0 || channels.length === 1) ? null : 's'} to review
            </Title>
            <Box display="flex" flexDirection="column" mt="1rem" style={{ gap: '0.5rem' }}>
              {channels.map((channel, index) => {
                return (
                  <Thumbnail
                    key={channel.id}
                    isActive={selectedChannelIndex === index}
                    handleClick={() => {
                      dispatch({
                        type: SET_SELECTED_CHANNEL_INDEX,
                        selectedChannelIndex: index,
                      })
                      setMenuOpen(false)
                    }}
                    thumbnailImage={channel.flagged_images[0]}
                    channelId={channel.id}
                  />
                )
              })}     
            </Box>
          </>
        )}
      </BoxLeft>

      <BoxRight xs="auto" md="auto" lg="auto" textAlign="center">
        <Wrapper
          handleMenuClick={() => setMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
          handleSettingsIconClick={() => setSettingsOpen(!isSettingsOpen)}
          hasChannels={channels.length > 0}
        >
          {(selectedChannelIndex === null || channels.length === 0) ? (
            <NoFlaggedImages channelsLength={channels.length} />
          ) : (
            <>
              <FlaggedCount
                maxWidth="24rem" py="0.6rem" px="1.5rem" borderRadius="1.6rem" mb="3rem" mt="4.2rem"
                fontWeight={600}
              >
                {channels[selectedChannelIndex].flagged_images.length} flagged thumbnails
              </FlaggedCount>
              <FlaggedImages flaggedImages={channels[selectedChannelIndex].flagged_images}/>
            </>
          )}
        </Wrapper>

        {!isMenuOpen && selectedChannelIndex !== null && (
          <ChannelActionButtons
            setSnackbarMessage={setMessage}
          />
        )}

      </BoxRight>

      <SettingsModal handleOpen={setSettingsOpen} open={isSettingsOpen} setSnackbarMessage={setMessage}/>
      <Snackbar message={message} setMessage={setMessage} />
    </Box>
  )
}

export default HomePage