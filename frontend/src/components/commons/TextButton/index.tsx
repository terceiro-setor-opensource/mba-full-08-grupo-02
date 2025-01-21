import { Button, ButtonProps as ChakraButtonProps, useToken } from '@chakra-ui/react'
import { useMemo } from 'react'

interface ButtonProps extends ChakraButtonProps {
  text: string
  backgroundColor?: string
}

export const TextButton = ({ text, backgroundColor, sx, ...props }: ButtonProps) => {
  const defaultBg = useToken('colors', 'green.500')
  const borderColor = useToken('colors', 'green.200')
  const defaultColor = useToken('colors', 'neutral.100')

  const buttonStyle = useMemo(
    () => ({
      bg: backgroundColor || defaultBg,
      borderColor,
      borderRadius: '20px',
      color: defaultColor,
      cursor: 'pointer',
      px: '3rem',
      width: 'fit-content',
    }),
    [backgroundColor, defaultBg, borderColor, defaultColor]
  )

  return (
    <Button sx={{ ...buttonStyle, ...sx }} {...props}>
      {text}
    </Button>
  )
}
