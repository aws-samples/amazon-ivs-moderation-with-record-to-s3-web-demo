import { useContext, useState } from 'react'
import { CircularProgress } from "@material-ui/core"
import colors from "../../theme/colors"
import thumbsupIcon from '../../assets/thumbsup.svg'
import { ButtonGrid, ChannelActionButtonContainer } from './styled'
import UserContext from '../../context/UserContext'
import { actionNames, apiActionNames } from '../../constants/actionNames'

import restApi from '../../api/api'
import ConfirmationModal from '../ConfirmationModal'
import ActionButton from './ActionButton'
import ChannelsContext from '../../context/ChannelsContext'
import { SET_CHANNELS, SET_SELECTED_CHANNEL_INDEX } from '../../context/ChannelsContextProvider'

const ChannelActionButtons = ({
  setSnackbarMessage,
}) => {

  const [confirmationPopupOpen, setConfirmationPopup] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [{userData}] = useContext(UserContext)
  const [{ channels, selectedChannelIndex }, dispatch] = useContext(ChannelsContext);

  const handleConfirm = (type) => {

    if(actionNames.IGNORE === type) {
      handleSubmit(apiActionNames.REPRIEVE, type)
    } else {
      setConfirmationPopup(true)
    }
  }
  
  const handleSubmit = (apiActionName, type) => {
    setIsSaving(true)

    const selectedChannelArn = channels[selectedChannelIndex].id

    const payload = {
      arn: selectedChannelArn,
      action: apiActionName,
      user: userData.username,
    };

    //1. Testing Ignore and Terminate button without API call
    // setTimeout(() => {
    //   setConfirmationPopup(false)
    //   setSnackbarMessage(`Channel ${type === actionNames.IGNORE ? "ignored" : "terminated"} successfully`)
    //   dispatch({
    //     type: SET_CHANNELS,
    //     channels: channels.length === 1 ? [] : channels.filter(channel => channel.id !== selectedChannelArn),
    //   })
    //   dispatch({
    //     type: SET_SELECTED_CHANNEL_INDEX,
    //     selectedChannelIndex: null
    //   })
    //   setIsSaving(false)
    // }, 2000);
  
    // 2.For Real API: uncomment below until end of bracket
    restApi
      .post("api/channel", payload)
      .then((response) => {
        console.log("respnose", response);
        setSnackbarMessage(`Channel ${type === actionNames.IGNORE ? "ignored" : "terminated"} successfully`)
        dispatch({
          type: SET_CHANNELS,
          channels: channels.length === 1 ? [] : channels.filter(channel => channel.id !== selectedChannelArn)
        })
        dispatch({
          type: SET_SELECTED_CHANNEL_INDEX,
          selectedChannelIndex: null
        })
      })
      .catch((error) => {
        console.log(error);
        setSnackbarMessage("Error! Something went wrong and the operation could not be completed")
      });
    setIsSaving(false)
    setConfirmationPopup(false)
  }

  return (
    <>
      <ChannelActionButtonContainer position="fixed" bottom={'1rem'} display="flex" justifyContent="center" zIndex="100" >
        <ButtonGrid container>
          <ActionButton
            handleClick={(e) => handleConfirm(actionNames.IGNORE)}
            hovercolor={colors.lightGreen}
            mright={'1.5rem'}
          >
            {isSaving ? <CircularProgress /> : (
              <>
                <img src={thumbsupIcon} alt="keep the channel" />
                Ignore
              </>
            )}
          </ActionButton>
          <ActionButton
            handleClick={(e) => handleConfirm(actionNames.TERMINATE)}
            hovercolor={colors.lightRed}
            mright={0}
          >
            <img src={thumbsupIcon} alt="suspend the channel" style={{ transform: 'rotate(180deg)'}} />
            Terminate
          </ActionButton>
        </ButtonGrid>
      </ChannelActionButtonContainer>

      <ConfirmationModal
        open={confirmationPopupOpen}
        handleClose={() => setConfirmationPopup(false)}
        handleConfirm={() => handleSubmit(apiActionNames.STOP, actionNames.TERMINATE)}
        isSaving={isSaving}
      />
    </>

  )

}

export default ChannelActionButtons
 