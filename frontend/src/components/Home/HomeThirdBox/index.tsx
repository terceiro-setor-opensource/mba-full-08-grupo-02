import { bannerInformation } from '@/consts/Home'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'

export const HomeThirdBox = () => {
  return (
    <Box textAlign={{ base: 'center' }} minH="300px">
      <HStack
        minH="300px"
        bgColor="green.100"
        justifyContent="space-around"
        wrap="wrap"
        py={{ base: 8, md: 12, lg: 16 }}
      >
        {bannerInformation.map((item, index) => (
          <VStack
            justifyContent="start"
            alignItems="center"
            key={index}
            p={4}
            spacing={{ base: 2, md: 2, lg: 6 }}
          >
            <Box as={item.icon} color="purple.100" size="4rem" />
            <Text
              maxW="200px"
              textAlign="center"
              pt={4}
              color="purple.100"
              fontWeight="bold"
              lineHeight="1.5"
            >
              {item.description}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  )
}
