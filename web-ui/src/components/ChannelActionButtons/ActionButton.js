import { Button } from "@material-ui/core"
import { useButtonStyles } from "./styled"

const ActionButton = (props) => {
  const { hovercolor, handleClick, children, ...other } = props;
  const classes = useButtonStyles(props);
  return (
  <Button
    onClick={handleClick}
    classes={{ label: classes.label, root: classes.root}}
    {...other}
  >
    {children}
  </Button>
  )
}

export default ActionButton