import { Box, HStack, VStack } from '@chakra-ui/layout'
import { Hide, Text } from '@chakra-ui/react'
import { bannerInformation } from '@/consts/Home'
import { useTranslation } from 'react-i18next'

export const HomeSecondBox = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <VStack justifyContent="center" alignItems="center">
        <Box padding={60} w={'90%'}>
          <Text textStyle={'h1'} mb={12}>
            {t('resources')}
          </Text>
          <Text textStyle={'subtitle'} lineHeight="1.5">
            {t('homeScondBox')}
          </Text>
        </Box>
      </VStack>
      <Hide below="md">
        <HStack
          padding={36}
          wrap="wrap"
          justifyContent="space-around"
          alignItems="baseline"
          bgColor="green.100"
          bgSize="cover"
        >
          {bannerInformation.map((item) => (
            <VStack justifyContent="start" alignItems="center">
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
      </Hide>
    </Box>
  )
}
