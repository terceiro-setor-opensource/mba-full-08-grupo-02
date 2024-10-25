import { Text, Link, Flex } from '@chakra-ui/react'
import { t } from 'i18next'
import { RiArrowLeftLine } from 'react-icons/ri'

export const BackButton = () => {
  return (
    <Link href="/.." width="100%">
      <Flex alignItems="center">
        <RiArrowLeftLine />
        <Text fontWeight="bold" marginLeft="1rem">
          {t('backButton')}
        </Text>
      </Flex>
    </Link>
  )
}
