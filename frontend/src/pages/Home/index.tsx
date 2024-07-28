import { Box, HStack, Stack } from "@chakra-ui/layout"
import { Button, Hide, Image, Text } from '@chakra-ui/react'
import LandingPage2 from '../../assets/images/landing2.png'
import LandingPage3 from '../../assets/images/landing3.png'
import { HomeFirstBox } from "../../components/commons/HomeComponents/HomeFirstBox";
import { HomeSecondBox } from "../../components/commons/HomeComponents/HomeSecondBox";
import { ChooseActivity } from "../../components/commons/HomeComponents/ChooseActivity";

export const Home = () => {
    return (
        <>
            <Stack>
                <HomeFirstBox />
            </Stack>
            <Box
                maxW="100vw"
                h="350px"
                bgRepeat="no-repeat"
                bgSize="cover"
                bgPosition="center top"
                bgAttachment="local"
                backgroundImage={LandingPage2}
            />
            <Stack>
                <HomeSecondBox />
                <ChooseActivity />
                <HStack alignItems="flex-start" justifyContent={"space-around"} p={10}>
                    <Box>
                        <Text textStyle={'title'} mb="1rem">Pronto para essa jornada?</Text>
                        <Button cursor="pointer" fontSize="16px" borderRadius="20px" bg="green.200" color="neutral.100" borderColor="green.200">Cadastre-se</Button>
                    </Box>
                    <Hide below='md'>
                        <Image
                            maxW="50%"
                            borderRadius="8px"
                            objectFit='cover'
                            src={LandingPage3}
                            alt='homem correndo na rua'
                        />
                    </Hide>
                </HStack>
            </Stack>
        </>
    )
}