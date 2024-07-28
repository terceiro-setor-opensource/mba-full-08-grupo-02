import { Box } from "@chakra-ui/layout"
import { Header } from "./components/commons/Header"
import { Home } from "./pages/Home"


function App() {
  return (
    <Box w="100vw" h="100vh">
      <Header />
      <Home />
    </Box>
  )
}

export default App
