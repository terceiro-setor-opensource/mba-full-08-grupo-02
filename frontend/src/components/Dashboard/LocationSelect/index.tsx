import theme from '@/theme'
import { HStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/react'
import { t } from 'i18next'
import { ChangeEvent } from 'react'
import { MdLocationOn } from 'react-icons/md'
const responsiveWidth = {
  base: '100%',
  md: 'auto',
}
export const LocationSelect = ({
  onChange,
}: {
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}) => (
  <HStack width={responsiveWidth}>
    <MdLocationOn color={theme.colors.neutral['500']} size={24} />
    <Select
      placeholder={t('dashboard.selectCity')}
      variant="unstyled"
      onChange={onChange}
    >
      <option value="São Paulo-SP">{t('dashboard.saoPaulo')}</option>
    </Select>
  </HStack>
)
