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

export const Header = () => {
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
        Cidade Ativa
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
            <MenuItem>Mapas</MenuItem>
            <MenuItem>Pesquisar</MenuItem>
            <MenuItem>Sobre</MenuItem>
            <MenuItem>Login</MenuItem>
          </MenuList>
        </Menu>
      </Hide>
      <Hide below="md">
        <ButtonGroup gap={12}>
          <Button cursor="pointer" fontSize={'button'} variant="link">
            Mapas
          </Button>
          <Button cursor="pointer" fontSize={'button'} variant="link" color="neutral.400">
            Pesquisar
          </Button>
          <Button cursor="pointer" fontSize={'button'} variant="link" color="neutral.400">
            Sobre
          </Button>
          <Button
            cursor="pointer"
            paddingX={20}
            borderRadius="20px"
            bg="green.200"
            color="neutral.100"
            borderColor="green.200"
          >
            Login
          </Button>
        </ButtonGroup>
      </Hide>
    </HStack>
  )
}
