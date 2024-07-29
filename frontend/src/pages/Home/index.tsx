import { Box, Stack } from "@chakra-ui/layout"
import LandingPage2 from '../../assets/images/landing2.png'
import { HomeFirstBox } from "../../components/commons/HomeComponents/HomeFirstBox";
import { HomeSecondBox } from "../../components/commons/HomeComponents/HomeSecondBox";
import { ChooseActivity } from "../../components/commons/HomeComponents/ChooseActivity";
import { Register } from "../../components/commons/HomeComponents/Register";

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
                <Register />
            </Stack>
        </>
    )
}