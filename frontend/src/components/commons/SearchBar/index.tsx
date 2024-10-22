import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'

type SearchBarProps = InputProps & {
  placeholder?: string
  onSearch: (value: string) => void
}

export const SearchBar = ({
  placeholder,
  onSearch,
  ...props
}: SearchBarProps) => {
  return (
    <>
      <InputGroup borderRadius={5} size="md">
        <InputLeftElement pointerEvents="none">
          <BiSearch color="gray.600" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
          {...props}
        />
      </InputGroup>
    </>
  )
}
