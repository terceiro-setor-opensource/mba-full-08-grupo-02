import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

type SearchBarProps = InputProps & {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export const SearchBar = ({placeholder, onSearch, ...props}: SearchBarProps) => {
  return (
    <>
      <InputGroup borderRadius={5} size="md">
        <InputLeftElement
          pointerEvents="none"
          children={<BiSearch color="gray.600" />}
        />
        <Input type="text" 
          placeholder={placeholder} 
          onChange={(e) => onSearch(e.target.value)} 
          {...props} 
        />
      </InputGroup>
    </>
  );
};
