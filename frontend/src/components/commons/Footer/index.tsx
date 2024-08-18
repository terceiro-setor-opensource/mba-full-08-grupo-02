import { HStack, Link, ListItem, UnorderedList, VStack } from "@chakra-ui/layout"
import { IconButton, Text } from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

export const Footer = () => {
    return (
        <HStack wrap="wrap" bg="neutral.200" paddingY={20} backgroundSize="cover" justifyContent="space-around" alignItems="flex-start">
            <VStack alignItems="flex-start">
                <Text textStyle={"h2"}>Cidade Ativa</Text>
                <Text textStyle={"p"}>Entre em contato</Text>
                <Link>cidadeAtiva@email.com</Link>
                <Text textStyle={"p"}>+1-2345-6789</Text>
                <Text textStyle={"p"}>São Paulo, Brasil</Text>
            </VStack>
            <VStack>
            <Text textStyle={"h2"}>Produtos</Text>
            <UnorderedList>
                <ListItem>Locais</ListItem>
                <ListItem>Eventos</ListItem>
                <ListItem>Benefícios</ListItem>
                <ListItem>Login</ListItem>
                <ListItem>Cadastro</ListItem>
            </UnorderedList>
            </VStack>
            <HStack pt={2} wrap="wrap" justifyContent="space-between">
                    <IconButton marginInline={2} aria-label={"facebook"} icon={<FaFacebook size={36} />} bg="transparent" />
                    <IconButton marginInline={2} aria-label={"facebook"} icon={<FaInstagram size={36} />} bg="transparent" />
                    <IconButton marginInline={2} aria-label={"facebook"} icon={<FaTwitter size={36} />} bg="transparent" />
                </HStack>
        </HStack>

    )
}