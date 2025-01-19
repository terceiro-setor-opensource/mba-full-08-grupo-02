import { SearchBar } from '@/components/commons/SearchBar'
import { Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { BiFilter } from 'react-icons/bi'
import { SortSelect } from '../SortSelect'
import { ChangeEvent } from 'react'

const responsiveWidth = {
  base: '100%',
  md: 'auto',
}
type SearchAndFilterProps = {
  onSearch: (search: string) => void
  sortChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const SearchAndFilter = ({
  onSearch,
  sortChange,
}: SearchAndFilterProps) => (
  <>
    <Box width="100%">
      <SearchBar
        placeholder={t('dashboard.searchPlace')}
        onSearch={onSearch}
        variant="filled"
      />
    </Box>
    <SortSelect onChange={sortChange} />
  </>
)
