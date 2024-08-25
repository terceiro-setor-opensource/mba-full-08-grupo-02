import { HStack, Heading, Spacer } from '@chakra-ui/layout'
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
} from '@chakra-ui/react'
import { TiThMenuOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Header = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  return (
    <HStack
      paddingX={60}
      paddingY={20}
      alignItems="center"
      borderBottom="1px"
      borderBottomColor="neutral.300"
    >
      <IconButton
        aria-label={'futebol'}
        icon={<Logo width="32" height="32" />}
        bg="transparent"
        _hover={{ bd: 'transparent' }}
        onClick={() => {
          navigate('/')
        }}
      />
      <Heading color="neutral.400" size={{ base: 'sm', md: 'md', lg: 'md' }}>
        {t('activeCity')}
      </Heading>
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
            <MenuItem> {t('login')}</MenuItem>
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
          <Button
            cursor="pointer"
            paddingX={20}
            borderRadius="20px"
            bg="green.200"
            color="neutral.100"
            borderColor="green.200"
          >
            {t('login')}
          </Button>
        </ButtonGroup>
      </Hide>
    </HStack>
  )
}
