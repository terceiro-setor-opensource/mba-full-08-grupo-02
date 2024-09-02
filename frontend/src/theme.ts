import { ChakraTheme, extendTheme, type ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const space = {
    4: '0.25rem',
    12: '0.75rem',
    20: '1.25rem',
    28: '1.75rem',
    36: '2.25rem',
    44: '2.75rem',
    52: '3.25rem',
    60: '3.75rem'
}

const textStyles = {
  h1: {
    fontSize: "1.5rem",
    fontWeight: "semibold",
  },
  h2: {
    fontSize: "1.125rem",
    fontWeight: 'semibold',
  },
  subtitle: {
    fontSize: "1.25rem",
    fontWeight: 'regular',
  },
  bodyFirst: {
    fontSize: "1rem",
    fontWeight: 'regular',
  },
  paragraphBold: {
    fontSize: "1rem",
    fontWeight: 'bold',
  },
  bodySecond: {
    fontSize: "0.875rem",
    fontWeight: 'regular',
  },
  caption: {
    fontSize: "0.688rem",
    fontWeight: 'semibold',
  },
  button: {
    fontSize: "1rem"
  }
}

const colors = {
  yellow: {
    100: '#F0B248',
  },
  purple: {
    200: '#AC46F0',
    100: '#675970'
  },
  green: {
    100: '#46F08F',
    200: '#609B7A'
  },
  neutral: {
    500: '#000000',
    400: '#777E90',
    300: '#D4D7E1',
    200: "#DEE5ED",
    100: "#FFFFFF"
  },
  status: {
    info: "#1D73C9",
    warning: "#E39803",
    success: "#1DA555",
    error: "#C42231"
  }
}

const styles = {
  global: {
    'html, body': {
      fontFamily: `'Source Sans 3', sans-serif`,
    }
  }
}

interface CustomTheme extends ChakraTheme {
  textStyles: typeof textStyles,
  colors: typeof colors,
  space: typeof space
}

const theme = extendTheme({ colors, textStyles, config, styles, space }) as CustomTheme

export default theme


