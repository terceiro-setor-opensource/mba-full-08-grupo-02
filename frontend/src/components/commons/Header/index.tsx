import { Flex, Heading, Spacer } from "@chakra-ui/layout"
import { Logo } from "../Logo"
import { ButtonGroup, Button } from "@chakra-ui/react"

export const Header = () => {
    return (
        <>
            <Flex minWidth='max-content' p='16px' alignItems='center' gap='2' borderBottom="1px" borderBottomColor="neutral.300">
                <Flex alignItems='center'justify="space-around">
                    <Logo width="32" height="32" />
                    <Heading color="neutral.400"  marginX="8px" size='md'>Cidade Ativa</Heading>
                </Flex>
                <Spacer />
                <ButtonGroup gap='4'>
                    <Button fontSize="16px" variant='link' color="green.200">Mapas</Button>
                    <Button fontSize="16px" variant='link' color="green.200">Pesquisar</Button>
                    <Button fontSize="16px" variant='link' color="green.200">Sobre</Button>
                    <Button fontSize="16px" borderRadius="20px" colorScheme='teal'>Login</Button>
                </ButtonGroup>
            </Flex>
        </>
    )
}