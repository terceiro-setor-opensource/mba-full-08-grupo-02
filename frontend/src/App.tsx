import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./pages/Layout"
import { Home } from "./pages/Home"
import { SignUp } from "./pages/SignUp"

import './i18n'
import { SignIn } from "./pages/SignIn"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
