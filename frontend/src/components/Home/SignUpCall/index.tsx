import {
  Box,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  Button,
} from '@chakra-ui/react'
import LandingPage3 from '@/assets/images/landing3.png'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const SignUpCall = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const boxWidth = useBreakpointValue({ base: '100%', lg: '60%' })
  const imageWidth = useBreakpointValue({ base: '100%', lg: '40%' })

  return (
    <Box display="flex" alignItems="center" justifyContent={'center'}>
      <HStack
        justifyContent="space-between"
        display={'flex'}
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={{ base: 6, md: 8, lg: 12 }}
        spacing={{ base: 6, md: 8, lg: 12 }}
      >
        <Box
          w={boxWidth}
          textAlign={{ base: 'center', lg: 'left' }}
          maxW="612px"
        >
          <Text
            textStyle="h1"
            mb={4}
            fontSize={{ base: '2xl', md: '4xl', lg: '6xl' }}
            fontFamily={'Montserrat'}
            fontWeight={'bold'}
          >
            {t('readyForThisJourney')}
          </Text>
          <Box mt={8}>
            <Button
              cursor="pointer"
              paddingX={22}
              paddingY={6}
              bg="transparent"
              borderRadius="20px"
              border={1}
              borderStyle={'solid'}
              color="green.200"
              borderColor="green.200"
              onClick={() => navigate('/register')}
            >
              {t('getSignUp')}
            </Button>
          </Box>
        </Box>

        <Box w={imageWidth} maxW="500px">
          <Image
            borderRadius="12px"
            objectFit="cover"
            src={LandingPage3}
            alt={t('imageAltText', 'A woman running on the street')}
            aria-label={t('imageAriaLabel', 'Training image')}
          />
        </Box>
      </HStack>
    </Box>
  )
}
