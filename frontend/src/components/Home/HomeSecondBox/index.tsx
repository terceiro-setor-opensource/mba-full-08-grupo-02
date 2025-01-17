import { Box, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const HomeSecondBox = () => {
  const { t } = useTranslation()

  return (
    <VStack
      spacing={6}
      align="stretch" // Make children stretch to full width
      justifyContent="center"
      px={{ base: 6, md: 12, lg: 20 }}
      py={{ base: 8, md: 12 }}
      w="100%" // Ensure the VStack takes full width
    >
      <Box
        maxW="800px" // Control the width of the text section
        mx="auto" // Center the Box horizontally
        textAlign={{ base: 'center' }}
      >
        <Text
          textStyle="h1"
          mb={4}
          fontSize={{ base: '1xl', md: '2xl', lg: '4xl' }}
          fontFamily="Montserrat"
          fontWeight="bold"
        >
          {t('resources')}
        </Text>
        <Text fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }} color="neutral.400">
          {t('homeSecondBox')}
        </Text>
      </Box>
    </VStack>
  )
}
