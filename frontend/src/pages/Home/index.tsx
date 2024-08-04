import { Box, Stack } from "@chakra-ui/layout"
import LandingPage2 from '../../assets/images/landing2.png'
import { HomeFirstBox } from "../../components/Home/HomeFirstBox";
import { HomeSecondBox } from "../../components/Home/HomeSecondBox";
import { ChooseActivity } from "../../components/Home/ChooseActivity";
import { Register } from "../../components/Home/Register";

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