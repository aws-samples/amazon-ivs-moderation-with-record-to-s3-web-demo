import { Box, CircularProgress, Fade } from '@material-ui/core'
import { ButtonGrid, FormControlButton } from './styled'
import colors from '../../theme/colors'

const SettingActionButtons = ({ handleOpen, isSaving, showActionButtons, handleSave }) => {
  return (
    <Box position="fixed" left="0" bottom="1rem" width="100vw" display="flex" justifyContent="center" zIndex="100" >
      <Fade in={showActionButtons}>
        <ButtonGrid container>
          <FormControlButton
            onClick={(e) => {
              e.preventDefault()
              handleOpen(false)
            }}
            bgcolor={colors.gray400}
            fontcolor={colors.secondary}
            mright={'1.5rem'}
          >
            Cancel
          </FormControlButton>
          <FormControlButton
            bgcolor={colors.green}
            fontcolor={colors.black}
            onClick={handleSave}
            mright={0}
          >
            {isSaving ? <CircularProgress /> : "Save"}
          </FormControlButton>
        </ButtonGrid>
      </Fade>
    </Box>
  )
}

export default SettingActionButtons

