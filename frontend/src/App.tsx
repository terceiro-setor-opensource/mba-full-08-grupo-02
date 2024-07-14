import { Text } from '@chakra-ui/layout'
import { ChakraProvider, theme } from '@chakra-ui/react'


function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Text fontSize='medium'> OIII</Text>
    </ChakraProvider>

  )
}

export default App
