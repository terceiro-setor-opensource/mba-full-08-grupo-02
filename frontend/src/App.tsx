import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./Layout"
import { Home } from "./pages/Home"
import { SignUp } from "./pages/SignUp"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cadastro" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
