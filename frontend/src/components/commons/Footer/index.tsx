import { HStack, Link, ListItem, UnorderedList, VStack } from '@chakra-ui/layout'
import { IconButton, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <HStack
      wrap="wrap"
      bg="neutral.200"
      paddingY={20}
      backgroundSize="cover"
      justifyContent="space-around"
      alignItems="flex-start"
    >
      <VStack alignItems="flex-start">
        <Text textStyle={'h2'}>{t('activeCity')}</Text>
        <Text textStyle={'p'}>{t('getInTouch')}</Text>
        <Link>{t('emailActiveCity')}</Link>
        <Text textStyle={'p'}>+1-2345-6789</Text>
        <Text textStyle={'p'}>{t('saoPaulo')}</Text>
      </VStack>
      <VStack>
        <Text textStyle={'h2'}>{t('products')}</Text>
        <UnorderedList>
          <ListItem>{t('locations')}</ListItem>
          <ListItem>{t('events')}</ListItem>
          <ListItem>{t('benefits')}</ListItem>
          <ListItem>{t('login')}</ListItem>
          <ListItem>{t('signUp')}</ListItem>
        </UnorderedList>
      </VStack>
      <HStack pt={2} wrap="wrap" justifyContent="space-between">
        <IconButton
          marginInline={2}
          aria-label={'facebook'}
          icon={<FaFacebook size={36} />}
          bg="transparent"
        />
        <IconButton
          marginInline={2}
          aria-label={'facebook'}
          icon={<FaInstagram size={36} />}
          bg="transparent"
        />
        <IconButton
          marginInline={2}
          aria-label={'facebook'}
          icon={<FaTwitter size={36} />}
          bg="transparent"
        />
      </HStack>
    </HStack>
  )
}
