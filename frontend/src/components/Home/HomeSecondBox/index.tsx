import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const HomeSecondBox = () => {
  const { t } = useTranslation()

  return (
    <Box
      textAlign={{ base: 'center' }}
      minH="300px"
      maxW={{ base: '100%', lg: '50%' }}
      mx="auto"
      justifyContent="space-around"
      py={{ base: 8, md: 12, lg: 16 }}
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
  )
}
