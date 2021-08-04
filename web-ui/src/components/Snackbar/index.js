import { Alert } from './styled'
import checkIcon from '../../assets/check.svg'
import { Snackbar } from "@material-ui/core"

const SnackbarComp = ({ message, setMessage }) => {
  return (
    <Snackbar
      onClose={() => setMessage(null)}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!!message}
    >
      {message && (
        <Alert elevation={2} icon={<img src={checkIcon} alt="Successful message" />}>
          {message}
        </Alert>
      )}
    </Snackbar>
  )
}

export default SnackbarComp