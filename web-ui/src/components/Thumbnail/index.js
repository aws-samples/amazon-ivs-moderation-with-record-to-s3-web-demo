import { Box } from '@material-ui/core'
import { ThumbnailLink, ThumbnailTitle, ThumbnailImage } from './styled'
import { getChannelId} from '../../util/functions'
import colors from '../../theme/colors'

const Thumbnail = ({ isActive, handleClick, thumbnailImage, channelId }) => {

  return (
    <ThumbnailLink
      variant="contained"
      disableElevation
      height="7.8rem"
      onClick={handleClick}
      isactive={isActive ? 1 : 0}
      startIcon={
        <Box component="div" minWidth="6.8rem" minHeight="5.8rem" width="6.8rem" overflow="hidden" borderRadius="1rem">
          <ThumbnailImage alt={`flagged thumbnail for channel: ${channelId}`} src={thumbnailImage} />
        </Box>
      }
    >
      <ThumbnailTitle style={{ color: isActive ? colors.primary : colors.secondary}}>
        {getChannelId(channelId)}
      </ThumbnailTitle>
    </ThumbnailLink>
  )
}

export default Thumbnail