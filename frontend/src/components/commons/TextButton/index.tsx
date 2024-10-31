import { Button } from '@chakra-ui/react'
import { t } from 'i18next'

interface ButtonProps {
  text: string
  backgroundColor?: string
}

const buttonStyle = {
  bg: 'green.500',
  borderColor: 'green.200',
  borderRadius: '20px',
  color: 'neutral.100',
  cursor: 'pointer',
  paddingX: '3rem',
}

export const TextButton = ({ text, backgroundColor }: ButtonProps) => (
  <Button
    sx={{ ...buttonStyle, bg: backgroundColor || buttonStyle.bg }}
    backgroundColor={backgroundColor}
    width="fit-content"
  >
    {text}
  </Button>
)
