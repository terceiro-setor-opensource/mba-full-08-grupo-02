import { Button, ButtonProps } from '@chakra-ui/react'

export const FormButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      mt={props.mt ?? 28}
      borderRadius="20px"
      w={props.width ?? '100%'}
      bg={props.bg ?? 'purple.200'}
      color={props.color ?? 'neutral.100'}
      borderColor={props.borderColor ?? 'purple.200'}
      type="submit"
    >
      {props.title}
    </Button>
  )
}
