import { Box, HStack } from '@chakra-ui/layout'
import { Button, Hide, Image, Text } from '@chakra-ui/react'
import LandingPage3 from '@/assets/images/landing3.png'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const SignUpCall = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()

  return (
    <HStack alignItems="flex-start" justifyContent={'space-around'} p={10}>
      <Box>
        <Text textStyle={'h1'} mb={12}>
          {t('readyForThisJourney')}
        </Text>
        <Button
          padding={20}
          cursor="pointer"
          borderRadius="20px"
          bg="green.200"
          color="neutral.100"
          borderColor="green.200"
          onClick={() => {
            navigate('/register')
          }}
        >
          {t('getSignUp')}
        </Button>
      </Box>
      <Hide below="md">
        <Image
          maxW="50%"
          borderRadius="8px"
          objectFit="cover"
          src={LandingPage3}
          alt="homem correndo na rua"
        />
      </Hide>
    </HStack>
  )
}
