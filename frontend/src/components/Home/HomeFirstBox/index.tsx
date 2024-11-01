import { Box, HStack, Image, Text } from '@chakra-ui/react'
import { Hide } from '@chakra-ui/react'
import LandingPage1 from '@/assets/images/landing1.png'
import { useTranslation } from 'react-i18next'

export const HomeFirstBox = () => {
  const { t } = useTranslation()

  return (
    <Box padding={60}>
      <HStack justifyContent="space-around">
        <Box w={{ base: '100%', md: '100%', lg: '40%' }}>
          <Text textStyle={'h1'} mb={12}>
            {t('activeCity')}
          </Text>
          <Text textStyle={'subtitle'} lineHeight="1.5">
            {t('homeFirstBox')}
          </Text>
        </Box>
        <Hide below="lg">
          <Box width="12px" h="300px" bg="purple.200" borderRadius="8px"></Box>
          <Box>
            <Image
              w="100%"
              borderRadius="8px"
              objectFit="cover"
              src={LandingPage1}
              alt="uma mulher treinando corrida na rua"
            />
          </Box>
        </Hide>
      </HStack>
    </Box>
  )
}
