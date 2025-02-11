import { Box, HStack, Spacer } from '@chakra-ui/layout'
import { Logo } from '../Logo'
import {
  ButtonGroup,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Hide,
  Img,
} from '@chakra-ui/react'
import { TiThMenuOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import { useCallback } from 'react'
import { t } from 'i18next'

interface User {
  name: string
  [key: string]: any
}

interface AuthMenuItemsProps {
  user: User
  logout: () => void
  navigate: (path: string) => void
}

interface LargeScreenMenuProps {
  user: User | null
  t: (key: string) => string
  navigate: (path: string) => void
  logout: () => void
}

const AuthMenuItems: React.FC<AuthMenuItemsProps> = ({
  user,
  logout,
  navigate,
}) => {
  return (
    <>
      <MenuItem>{user.name}</MenuItem>
      <MenuItem onClick={() => navigate('/dashboard')}>Dashboard</MenuItem>
      <MenuItem onClick={() => navigate('/admin/places')}>Gerenciar locais</MenuItem>
      <MenuItem>{t('requestCatalog')}</MenuItem>
      <MenuItem onClick={logout} cursor="pointer">
        {t('logout')}
      </MenuItem>
    </>
  )
}

const LargeScreenMenu: React.FC<LargeScreenMenuProps> = ({
  user,
  t,
  navigate,
  logout,
}) => (
  <ButtonGroup gap={12}>
    <Button cursor="pointer" fontSize={'button'} variant="link">
      {t('maps')}
    </Button>
    <Button
      cursor="pointer"
      fontSize={'button'}
      variant="link"
      color="neutral.400"
      onClick={() => navigate('/dashboard')}
    >
      {t('search')}
    </Button>
    <Button
      cursor="pointer"
      fontSize={'button'}
      variant="link"
      color="neutral.400"
      onClick={() => navigate('/about')}
    >
      {t('about')}
    </Button>
    {!user ? (
      <Button
        cursor="pointer"
        paddingX={20}
        borderRadius="20px"
        bg="green.200"
        color="neutral.100"
        borderColor="green.200"
        onClick={() => navigate('/login')}
      >
        {t('login')}
      </Button>
    ) : (
      <Menu>
        <MenuButton as={Button} backgroundColor={'transparent'}>
          <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Img
              borderRadius="50%"
              src={'https://eu.ui-avatars.com/api/?name=U+Fe&size=250'}
              alt={user.name}
              boxSize="30px"
            />
            {user.name}
          </Box>
        </MenuButton>
        <MenuList>
          <AuthMenuItems user={user} logout={logout} navigate={navigate} />
        </MenuList>
      </Menu>
    )}
  </ButtonGroup>
)

export const Header: React.FC = () => {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    logout()
    navigate('/')
  }, [logout, navigate])

  const handleNavigate = useCallback(
    (path: string) => () => navigate(path),
    [navigate],
  )

  return (
    <HStack
      paddingX={60}
      paddingY={20}
      alignItems="center"
      borderBottom="1px"
      borderBottomColor="neutral.300"
    >
      <ButtonGroup
        variant="ghost"
        _hover={{ bg: 'transparent' }}
        onClick={handleNavigate('/')}
      >
        <IconButton
          aria-label={'futebol'}
          icon={<Logo width="64" height="64" />}
          bg="transparent"
          _hover={{ bd: 'transparent' }}
        />
      </ButtonGroup>

      <Spacer />

      {/* Menu for Small Screens */}
      <Hide above="md">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<TiThMenuOutline color="#609B7A" />}
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={handleNavigate('/maps')}>{t('maps')}</MenuItem>
            <MenuItem onClick={handleNavigate('/search')}>
              {t('search')}
            </MenuItem>
            <MenuItem onClick={handleNavigate('/about')}>{t('about')}</MenuItem>
            {!user && (
              <MenuItem onClick={handleNavigate('/login')}>
                {t('login')}
              </MenuItem>
            )}
            {user && (
              <AuthMenuItems
                user={user}
                logout={handleLogout}
                navigate={navigate}
              />
            )}
          </MenuList>
        </Menu>
      </Hide>

      {/* Button Group for Larger Screens */}
      <Hide below="md">
        <LargeScreenMenu
          user={user}
          t={t}
          navigate={navigate}
          logout={handleLogout}
        />
      </Hide>
    </HStack>
  )
}
