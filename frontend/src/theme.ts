import { extendTheme, type ThemeConfig  } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const textStyles = {
  h1: {
      fontSize: "24px",
      fontWeight: "semibold",
    },
    h2: {
      fontSize: "18px",
      fontWeight: 'semibold',
    },
    subtitle: {
      fontSize: "18px",
      fontWeight: 'regular',
    },
    p:{
      fontSize: "16px",
      fontWeight: 'regular',
    },
    paragraphBold: {
      fontSize: "16px",
      fontWeight: 'bold',
    },
    bodySecond: {
      fontSize: "14px",
      fontWeight: 'regular',
    },
    caption: {
      fontSize: "12px",
      fontWeight: 'semibold',
  },
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


const theme = extendTheme({ colors, textStyles, config, styles })

export default theme


