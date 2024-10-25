import theme from '@/theme'
import { AbsoluteCenter, Box, Divider, HStack } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/react'
import { t } from 'i18next'
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa'

export const SocialMedia = () => {
  return (
    <>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4" color={theme.colors.neutral['400']}>
          {t('otherAccounts')}
        </AbsoluteCenter>
      </Box>
      <HStack pt={2} wrap="wrap" justifyContent="center" gap={30}>
        <IconButton
          aria-label={'facebook'}
          icon={<FaGoogle size={24} />}
          bg="transparent"
          borderRadius={theme.radii.full}
          border={'solid'}
          borderColor={theme.colors.neutral['100']}
          shadow="md"
          w="52px"
          height="52px"
        />
        <IconButton
          aria-label={'facebook'}
          icon={<FaApple size={24} />}
          bg="transparent"
          borderRadius={theme.radii.full}
          border={'solid'}
          borderColor={theme.colors.neutral['100']}
          shadow="md"
          w="52px"
          height="52px"
        />
        <IconButton
          aria-label={'facebook'}
          icon={<FaFacebook size={24} />}
          bg="transparent"
          borderRadius={theme.radii.full}
          border={'solid'}
          borderColor={theme.colors.neutral['100']}
          shadow="md"
          w="52px"
          height="52px"
        />
      </HStack>
    </>
  )
}
