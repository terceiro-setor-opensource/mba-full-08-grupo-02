import theme from '@/theme'
import { HStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/react'
import { t } from 'i18next'
import { BiRun } from 'react-icons/bi'

const responsiveWidth = {
  base: '100%',
  md: 'auto',
}
export const SportSelect = () => (
  <HStack width={responsiveWidth}>
    <BiRun color={theme.colors.neutral['500']} size={24} />
    <Select placeholder={t('dashboard.selectSport')} variant="unstyled">
      <option value="option1">{t('dashboard.running')}</option>
    </Select>
  </HStack>
)
