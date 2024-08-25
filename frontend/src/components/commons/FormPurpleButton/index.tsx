import { Button, ButtonProps } from '@chakra-ui/react'

export const FormPurpleButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      mt={28}
      borderRadius="20px"
      w="100%"
      bg="purple.200"
      color="neutral.100"
      borderColor="purple.200"
      type="submit"
    >
      {props.title}
    </Button>
  )
}
