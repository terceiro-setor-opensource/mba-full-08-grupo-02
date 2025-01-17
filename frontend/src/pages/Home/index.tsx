import { Box, Stack, VStack } from '@chakra-ui/react'
import LandingPage2 from '../../assets/images/landing2.png'
import { HomeSecondBox } from '@/components/Home/HomeSecondBox'
import { ChooseActivity } from '@/components/Home/ChooseActivity'
import { SignUpCall } from '@/components/Home/SignUpCall'
import { HeroSection } from '@/components/Home/HomeFirstBox'

export const Home = () => {
  return (
    <Box>
      <Box pb={16}>
        <HeroSection />
      </Box>

      <Box
        maxW="100vw"
        h="450px"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        backgroundImage={LandingPage2}
      />

      <VStack
        mt={16}
        mb={16}
        spacing={6}
        align="stretch"
        justifyContent="center"
        px={{ base: 6, md: 12, lg: 20 }}
        py={{ base: 8, md: 12 }}
        w="100%"
      >
        <HomeSecondBox />
        <ChooseActivity />
        <SignUpCall />
      </VStack>
    </Box>
  )
}
