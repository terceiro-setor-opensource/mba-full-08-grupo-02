import { Text } from '@chakra-ui/layout'

export const UnderlinedTitle = ({ title }: { title: string }) => {
  return (
    <Text
      fontWeight="Bold"
      fontSize="1.2rem"
      padding=".1rem 0"
      borderBottom=".3rem solid #AC46F0"
      width="fit-content"
    >
      {title}
    </Text>
  )
}
