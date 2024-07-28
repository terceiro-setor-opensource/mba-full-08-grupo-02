import { Box } from "@chakra-ui/layout"
import { Header } from "./components/commons/Header"
import { Home } from "./pages/Home"
import { Footer } from "./components/commons/Footer"


function App() {
  return (
    <Box w="100vw" h="100vh">
      <Header />
      <Home />
      <Footer/>
    </Box>
  )
}

export default App
