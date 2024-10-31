import theme from '@/theme'
import { HStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/react'
import { t } from 'i18next'
import { MdLocationOn } from 'react-icons/md'

const responsiveWidth = {
  base: '100%',
  md: 'auto',
}
export const OrderSelect = () => (
  <Select
    width="fit-content"
    placeholder={t('orderSelection.select')}
    size="md"
  >
    <option value="desc">{t('orderSelection.newer')}</option>
    <option value="asc">{t('orderSelection.older')}</option>
  </Select>
)
