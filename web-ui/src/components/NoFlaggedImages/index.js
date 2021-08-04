
import { Box, Typography } from '@material-ui/core'
import { TitleWithIcon } from './styled'

import bgOne from '../../assets/non-selected-1.svg'
import bgTwo from '../../assets/non-selected-2.svg'
import noStreamBGOne from '../../assets/no-streams-1.svg'
import noStreamBGTwo from '../../assets/no-streams-2.svg'
import doubleCheck from '../../assets/doubleCheck.svg'


const NoChannelsToModerate = () => (
  <>
    <TitleWithIcon variant="h5" style={{ zIndex: '80'}}>
      <img src={doubleCheck} alt="channels all moderated" />
      You're all done!
    </TitleWithIcon>
    <img src={bgTwo} alt="liquid effect circle 2" style={{ position: 'absolute', mixBlendMode: 'color-dodge' }} />
    <img src={bgOne} alt="liquid effect circle 1" style={{ position: 'absolute', mixBlendMode: 'color-dodge' }} />
  </>
)

const NoChannelSelected = () => (
  <>
    <Typography variant="h5" style={{ zIndex: '80'}}>Select a channel to moderate</Typography>
    <img src={noStreamBGOne} alt="liquid effect circle 3" style={{ position: 'absolute', mixBlendMode: 'color-dodge' }} />
    <img src={noStreamBGTwo} alt="liquid effect circle 4" style={{ position: 'absolute', mixBlendMode: 'color-dodge' }} />
  </>
)

const NoFlaggedImages = ({ channelsLength }) => {
  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      {channelsLength === 0 ? (
        <NoChannelsToModerate />
      ): (
        <NoChannelSelected />
      )}
    </Box>
  )
}

export default NoFlaggedImages