import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    fontSizes: {
      lg: '18px',
      md: '12px',
    },
    colors: {
      yellow: {
        100: '#F0B248',
      },
      purple: {
        100: '#AC46F0',
        700: '#675970'
      },
      green: {
        100: '#46F08F',
        200: '#609B7A'
      },
      black: '#000000',
      neutral: {
        100: '#DEE5ED',
        200: '#D4D7E1',
        300: '#777E90'
      }
    },
    fonts: {
      heading: `Montserrat', sans-serif`,
      body: `'Montserrat, sans-serif`,
    },
  })

