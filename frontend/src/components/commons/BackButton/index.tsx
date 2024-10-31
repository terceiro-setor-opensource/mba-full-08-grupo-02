import { Text, Link, Flex, Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { RiArrowLeftLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

export const BackButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      bg="none"
      onClick={(e) => {
        e.preventDefault()
        navigate(-1)
      }}
    >
      <Flex alignItems="center">
        <RiArrowLeftLine />
        <Text fontWeight="bold" marginLeft="1rem">
          {t('backButton')}
        </Text>
      </Flex>
    </Button>
  )
}
