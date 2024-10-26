import { Box, Image, Text } from '@chakra-ui/react'
import { Hide } from '@chakra-ui/react'
import LandingPage4 from '@/assets/images/landing4.png'
import { useTranslation } from 'react-i18next'

export const Banner = () => {
  const { t } = useTranslation()


  return (
    <Box padding={8} >
        <Hide below="lg">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              w="70%"
              borderRadius="8px"
              objectFit="cover"
              align="center"
              src={LandingPage4}
              alt="dois homens se cumprimentando"
            />
          </Box>
          <Box pt={8} display="flex" justifyContent="center" alignItems="center">
          <Text textStyle={'h1'} mb={12}>
            {t('benefitsForYou')}
          </Text>
        </Box>
        </Hide>
    </Box>
  )
}
