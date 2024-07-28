import { HStack, Heading, Spacer } from "@chakra-ui/layout"
import { Logo } from "../Logo"
import { ButtonGroup, Button, IconButton, Menu, MenuButton, MenuItem, MenuList, Hide } from "@chakra-ui/react"
import { TiThMenuOutline } from "react-icons/ti"

export const Header = () => {
    return (
        <HStack paddingY='16px' paddingX='24px' alignItems='center' borderBottom="1px" borderBottomColor="neutral.300">
            <IconButton aria-label={"futebol"} icon={<Logo width="32" height="32" />} bg="transparent" _hover={{ bd: "transparent" }} />
            <Heading color="neutral.400" size={{ base: "sm", md: 'md', lg: "md" }}>Cidade Ativa</Heading>
            <Spacer />
            <Hide above="md">
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<TiThMenuOutline color='#609B7A'/>}
                        variant='outline'
                    />
                    <MenuList>
                        <MenuItem>
                            Mapas
                        </MenuItem>
                        <MenuItem >
                            Pesquisar
                        </MenuItem>
                        <MenuItem >
                            Sobre
                        </MenuItem>
                        <MenuItem>
                            Login
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Hide>
            <Hide below="md">
                <ButtonGroup gap={2}>
                    <Button cursor="pointer" fontSize="16px" variant='link' color="green.200">Mapas</Button>
                    <Button cursor="pointer" fontSize="16px" variant='link' color="green.200">Pesquisar</Button>
                    <Button cursor="pointer" fontSize="16px" variant='link' color="green.200">Sobre</Button>
                    <Button cursor="pointer" fontSize="16px" borderRadius="20px" bg="green.200" color="neutral.100" borderColor="green.200">Login</Button>
                </ButtonGroup>
            </Hide>
        </HStack>
    )
}