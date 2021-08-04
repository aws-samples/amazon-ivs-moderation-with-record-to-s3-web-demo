/* eslint-disable react-hooks/exhaustive-deps */
import SettingsIcon from '../../assets/settings.svg'
import MenuIcon from '../../assets/menu.js'
import {Header, StyledButton, WrapperInner, MenuButton, NotificationIcon, WrapperOuter } from './styled'
import { Box } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import colors from '../../theme/colors'

const Wrapper = ({
  children,
  handleMenuClick,
  isMenuOpen,
  handleSettingsIconClick,
  hasChannels,
}) => {
  const handleClick = () => {
    Auth.signOut()
  }

  return (
    <WrapperOuter>
      <Header display="flex" alignItems="center" justifyContent="space-between">
        <MenuButton onClick={handleMenuClick}>
          {hasChannels && <NotificationIcon />}
          <MenuIcon color={isMenuOpen ? colors.primary : colors.secondary}/>
        </MenuButton>
        <Box display="flex">
          <StyledButton onClick={handleSettingsIconClick} width={'5.4rem'}>
            <img src={SettingsIcon} alt="Open" />
          </StyledButton>
          <StyledButton onClick={handleClick} width={'9.2rem'}>Log out</StyledButton>
        </Box>
      </Header>
      <WrapperInner maxWidth={1200} pl={3} pr={3} display="flex" flexDirection="column" alignItems='center'>{children}</WrapperInner>
    </WrapperOuter>
  )
}

export default Wrapper