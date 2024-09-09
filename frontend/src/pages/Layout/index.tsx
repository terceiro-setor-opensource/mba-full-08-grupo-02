import { Outlet } from "react-router-dom"
import { Footer } from "@/components/commons/Footer"
import { Header } from "@/components/commons/Header"
import { Box } from "@chakra-ui/layout"

export const Layout = () => {
    return (
        <Box w="100%" h="100vh">
            <Header />
            <Outlet />
            <Footer />
        </Box>
    )
}