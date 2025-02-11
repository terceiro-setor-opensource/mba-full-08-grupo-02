import theme from '@/theme'
import { HStack } from '@chakra-ui/layout'
import { Select, SelectProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { ChangeEvent } from 'react'
import { BiRun } from 'react-icons/bi'

const responsiveWidth = {
  base: '100%',
  md: 'auto',
}

interface SportSelectProps extends SelectProps {
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  options: { text: string; value: number }[]
}


export const SportSelect = ({
  onChange,
  options,
  defaultValue,
  ...rest
}: SportSelectProps) => (
  <HStack width={responsiveWidth}>
    <BiRun color={theme.colors.neutral['500']} size={24} />
    <Select
      placeholder={t('dashboard.selectSport')}
      variant="unstyled"
      onChange={onChange}
      {...rest}
    >
      {(options || []).map((selectOption) => (
        <option value={selectOption.value.toString()}>{selectOption.text}
        </option>
      ))}
    </Select>
  </HStack>
)
