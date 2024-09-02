import { Box, HStack, Heading, Spacer } from '@chakra-ui/layout'
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

export const Header = () => {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <HStack
      paddingX={60}
      paddingY={20}
      alignItems="center"
      borderBottom="1px"
      borderBottomColor="neutral.300"
    >
      <Button
        variant="ghost"
        _hover={{ bg: 'transparent' }}
        onClick={() => {
          navigate('/')
        }}
      >
        <IconButton
          aria-label={'futebol'}
          icon={<Logo width="32" height="32" />}
          bg="transparent"
          _hover={{ bd: 'transparent' }}
        />
        <Heading color="neutral.400" size={{ base: 'sm', md: 'md', lg: 'md' }}>
          {t('activeCity')}
        </Heading>
      </Button>
      <Spacer />
      <Hide above="md">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<TiThMenuOutline color="#609B7A" />}
            variant="outline"
          />
          <MenuList>
            <MenuItem> {t('maps')}</MenuItem>
            <MenuItem> {t('search')}</MenuItem>
            <MenuItem> {t('about')}</MenuItem>
            {!user && (
              <MenuItem
                onClick={() => {
                  navigate('/login')
                }}
              >
                {t('login')}
              </MenuItem>
            )}
            {user && (
              <>
                <MenuItem>{user.name}</MenuItem>
                <MenuItem>Dashboard</MenuItem>
                <MenuItem>{t('requestCatalog')}</MenuItem>
                <MenuItem onClick={logout} cursor="pointer">
                  {t('logout')}
                </MenuItem>
              </>
            )}

          </MenuList>
        </Menu>
      </Hide>
      <Hide below="md">
        <ButtonGroup gap={12}>
          <Button cursor="pointer" fontSize={'button'} variant="link">
            {t('maps')}
          </Button>
          <Button cursor="pointer" fontSize={'button'} variant="link" color="neutral.400">
            {t('search')}
          </Button>
          <Button cursor="pointer" fontSize={'button'} variant="link" color="neutral.400">
            {t('about')}
          </Button>
          {!user && (
            <Button
              cursor="pointer"
              paddingX={20}
              borderRadius="20px"
              bg="green.200"
              color="neutral.100"
              borderColor="green.200"
              onClick={() => {
                navigate('/login')
              }}
            >
              {t('login')}
            </Button>
          )}
          {user && (
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
                <MenuItem>Dashboard</MenuItem>
                <MenuItem>{t('requestCatalog')}</MenuItem>
                <MenuItem onClick={logout}>{t('logout')}</MenuItem>
              </MenuList>
            </Menu>
          )}
        </ButtonGroup>
      </Hide>
    </HStack>
  )
}
