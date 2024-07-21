import { Box, Container, Flex, SimpleGrid, Stack } from "@chakra-ui/layout"
import { Image, Text } from '@chakra-ui/react'
import LandingPage1 from '../assets/images/landing1.png'


export const Home = () => {
    return (
        <>
            <Stack p="4rem">
                <SimpleGrid columns={2} spacing={10}>
                    <Stack spacing={8}>
                        <Text textStyle={'h1'}>Cidade Ativa</Text>
                        <Text textStyle={'p'}>Prepare-se para embarcar em uma jornada emocionante em direção a uma vida mais ativa e saudável! Estamos empenhados em ajudá-lo a encontrar os melhores lugares para praticar exercícios físicos, seja você um entusiasta experiente ou alguém que está apenas começando sua jornada de condicionamento físico</Text>
                    </Stack>
                    <Image
                        boxSize="80%"
                        objectFit='cover'
                        src={LandingPage1}
                        alt='mulher correndo na rua'
                    />
                </SimpleGrid>
            </Stack>
        </>
    )
}