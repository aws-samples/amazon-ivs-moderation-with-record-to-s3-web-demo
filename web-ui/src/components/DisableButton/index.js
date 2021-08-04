import { Button } from '@material-ui/core'
import { moderationTypes } from '../../constants/moderation'
import { disableButtonStyles } from './styled'

const DisableButtonComp = ({ type, isDisabled, handleClick}) => {
  const classes = disableButtonStyles({ isDisabled });
  return (
    <Button
      onClick={handleClick}
      name={type}
      classes={{
        label: classes.label,
        root: classes.root
      }}
    >
      {type === moderationTypes.ALERT ? "Alert" : "Terminate"}
    </Button>
    )
}

export default DisableButtonComp