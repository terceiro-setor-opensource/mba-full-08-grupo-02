import {
  Badge,
  Box,
  Flex,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Hide } from '@chakra-ui/react'
import LandingPage4 from '@/assets/images/landing4.png'
import { useTranslation } from 'react-i18next'

export const Banner = ({ activities = [] }: { activities?: string[] }) => {
  const { t } = useTranslation()
  return (
    <Box padding={8}>
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
          <VStack>
            <Text textStyle={'h1'} mb={12}>
              {t('benefitsForYou')}
            </Text>
            <Flex wrap={'wrap'} justifyContent="center">
              {activities.map((activity, index) => (
                <Badge key={index} mr={2}>
                  {activity}
                </Badge>
              ))}
            </Flex>
          </VStack>
        </Box>
      </Hide>
    </Box>
  )
}
