import {
  Box,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  Button,
} from '@chakra-ui/react'
import LandingPage1 from '@/assets/images/landing1.png'
import { useTranslation } from 'react-i18next'

export const HeroSection = () => {
  const { t } = useTranslation()
  const boxWidth = useBreakpointValue({ base: '100%', lg: '60%' })
  const imageWidth = useBreakpointValue({ base: '100%', lg: '40%' })

  return (
    <Box
      minHeight="70vh"
      px={{ base: 6, md: 12, lg: 20 }}
      py={{ base: 8, md: 12 }}
      display="flex"
      alignItems="center"
      justifyContent={'center'}
    >
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
            {t('activeCity')}
          </Text>
          <Text
            fontSize={{
              base: 'sm',
              md: 'lg',
              lg: 'xl',
            }}
            color={'neutral.400'}
          >
            {t('homeFirstBox')}
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
            >
              Explorar
            </Button>
          </Box>
        </Box>

        <Box w={imageWidth} maxW="500px">
          <Image
            borderRadius="12px"
            objectFit="cover"
            src={LandingPage1}
            alt={t('imageAltText', 'A woman running on the street')}
            aria-label={t('imageAriaLabel', 'Training image')}
          />
        </Box>
      </HStack>
    </Box>
  )
}
