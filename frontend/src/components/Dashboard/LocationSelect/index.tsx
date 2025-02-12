import { locations } from '@/consts/locations'
import theme from '@/theme'
import { HStack } from '@chakra-ui/layout'
import { Select, SelectProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { ChangeEvent } from 'react'
import { MdLocationOn } from 'react-icons/md'

const responsiveWidth = {
  base: '100%',
  md: 'auto',
}

interface LocationSelectProps extends SelectProps {
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const LocationSelect = ({
  onChange,
  ...rest
}: LocationSelectProps) => (
  <HStack width={responsiveWidth}>
    <MdLocationOn color={theme.colors.neutral['500']} size={24} />
    <Select
      placeholder={t('dashboard.selectCity')}
      variant="unstyled"
      onChange={onChange}
      {...rest}
    >
      {locations.map((location) => (
          <option key={location.value} value={location.value}>{location.label}</option>
        ))
      }
    </Select>
  </HStack>
)
