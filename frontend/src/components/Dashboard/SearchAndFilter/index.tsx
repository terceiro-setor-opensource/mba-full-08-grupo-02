import { SearchBar } from '@/components/commons/SearchBar'
import { Box } from '@chakra-ui/layout'
import { InputProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { SortSelect } from '../SortSelect'
import { ChangeEvent } from 'react'


interface SearchAndFilterProps extends InputProps {
  onSearch: (search: string) => void
  sortChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const SearchAndFilter = ({
  onSearch,
  sortChange,
  ...rest
}: SearchAndFilterProps) => (
  <>
    <Box width="100%">
      <SearchBar
        placeholder={t('dashboard.searchPlace')}
        onSearch={onSearch}
        variant="filled"
        {...rest}
      />
    </Box>
    <SortSelect onChange={sortChange} />
  </>
)
