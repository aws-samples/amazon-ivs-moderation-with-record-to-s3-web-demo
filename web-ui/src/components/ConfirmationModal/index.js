import { Backdrop, Box, CircularProgress, Fade, Typography } from "@material-ui/core"
import colors from "../../theme/colors"
import { ModalOuter, ModalContent, ActionButton } from "./styled"

const ConfirmationModal = ({ open, handleClose, handleConfirm, isSaving }) => {
  return (
    <ModalOuter
      open={open}
      onClose={handleClose}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ModalContent>
          <Typography variant="h2">
            Are you sure you would like to terminate this channel?
          </Typography>
          <Box display="flex">
              <ActionButton
                onClick={handleClose}
                bgcolor={colors.gray400} mright="1.5rem" hovercolor={colors.gray300}
              >
                  Cancel
              </ActionButton>
              <ActionButton
                onClick={handleConfirm}
                bgcolor={colors.alert} mright='0' hovercolor={colors.alertHover}
              >
                {isSaving ? <CircularProgress size="2rem" /> : "Terminate"}
              </ActionButton>
          </Box>
        </ModalContent>
          
      </Fade>
    </ModalOuter>
  )
}

export default ConfirmationModal