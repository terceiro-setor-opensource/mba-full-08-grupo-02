import theme from '@/theme'
import { HStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/react'
import { t } from 'i18next'
import { ChangeEvent } from 'react'
import { BiRun } from 'react-icons/bi'
import { RiArrowUpDownLine } from 'react-icons/ri'

const responsiveWidth = {
  base: '100%',
  md: 'auto',
}

const options = [
  { value: 'name/ASC', text: 'Nome A-Z' },
  { value: 'name/DESC', text: 'Nome Z-A' },
  { value: 'distance/ASC', text: 'Distância menor para maior' },
  { value: 'distance/DESC', text: 'Distância maior para menor' },
]

export const SortSelect = ({
  onChange,
}: {
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}) => (
  <HStack width={responsiveWidth}>
    <RiArrowUpDownLine color={theme.colors.neutral['500']} size={24} />
    <Select
      placeholder={t('dashboard.selectSort')}
      variant="unstyled"
      onChange={onChange}
    >
      {(options || []).map((selectOption) => (
        <option value={selectOption.value}>{selectOption.text}</option>
      ))}
    </Select>
  </HStack>
)
