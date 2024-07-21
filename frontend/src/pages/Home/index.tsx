import { Box, Flex, Stack } from "@chakra-ui/layout"
import { Image, Text } from '@chakra-ui/react'
import LandingPage1 from '../../assets/images/landing1.png'


export const Home = () => {
    return (
        <>
            <Stack p={24}>
                <Flex justifyContent="space-around">
                    <Box gap="4px" w="40%">
                        <Text textStyle={'h1'}>Cidade Ativa</Text>
                        <Text textStyle={'p'}>Prepare-se para embarcar em uma jornada emocionante em direção a uma vida mais ativa e saudável! Estamos empenhados em ajudá-lo a encontrar os melhores lugares para praticar exercícios físicos, seja você um entusiasta experiente ou alguém que está apenas começando sua jornada de condicionamento físico</Text>
                    </Box>
                    <Box width="12px" bg="purple.200" borderRadius="8px"></Box>
                    <Box w="40%">
                        <Image
                            borderRadius="8px"
                            boxSize="100%"
                            objectFit='cover'
                            src={LandingPage1}
                            alt='mulher correndo na rua'
                        />
                    </Box>
                </Flex>
            </Stack>
        </>
    )
}