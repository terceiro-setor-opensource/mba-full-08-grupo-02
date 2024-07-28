import { Flex, Heading, Spacer } from "@chakra-ui/layout"
import { Logo } from "../Logo"
import { ButtonGroup, Button } from "@chakra-ui/react"

export const Header = () => {
    return (
        <>
            <Flex minWidth='max-content' p='16px 36px' alignItems='center' gap='2' borderBottom="1px" borderBottomColor="neutral.300">
                <Flex alignItems='center' justify="space-around">
                    <Logo width="32" height="32" />
                    <Heading color="neutral.400" marginX="8px" size='md'>Cidade Ativa</Heading>
                </Flex>
                <Spacer />
                <ButtonGroup gap='4'>
                    <Button cursor="pointer" fontSize="16px" variant='link' color="green.200">Mapas</Button>
                    <Button cursor="pointer" fontSize="16px" variant='link' color="green.200">Pesquisar</Button>
                    <Button cursor="pointer" fontSize="16px" variant='link' color="green.200">Sobre</Button>
                    <Button cursor="pointer" fontSize="16px" borderRadius="20px" bg="green.200" color="neutral.100" borderColor="green.200">Login</Button>
                </ButtonGroup>
            </Flex>
        </>
    )
}