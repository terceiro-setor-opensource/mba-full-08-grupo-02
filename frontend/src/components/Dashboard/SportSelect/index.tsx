import theme from '@/theme'
import { HStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/react'
import { t } from 'i18next'
import { ChangeEvent } from 'react'
import { BiRun } from 'react-icons/bi'

const responsiveWidth = {
  base: '100%',
  md: 'auto',
}
export const SportSelect = ({
  onChange,
  options,
}: {
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  options: { text: string; value: number }[]
}) => (
  <HStack width={responsiveWidth}>
    <BiRun color={theme.colors.neutral['500']} size={24} />
    <Select
      placeholder={t('dashboard.selectSport')}
      variant="unstyled"
      onChange={onChange}
    >
      {(options || []).map((selectOption) => (
        <option value={selectOption.value}>{selectOption.text}</option>
      ))}
    </Select>
  </HStack>
)
