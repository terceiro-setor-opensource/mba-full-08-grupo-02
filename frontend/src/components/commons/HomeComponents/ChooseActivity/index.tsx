import { HStack, VStack } from "@chakra-ui/layout"
import { IconButton, Text } from '@chakra-ui/react'
import { FaBasketballBall, FaFutbol, FaRunning, FaVolleyballBall, FaWalking } from "react-icons/fa";
import { CgGym } from "react-icons/cg";

export const ChooseActivity = () => {
    return (
        <HStack justifyContent="center" py={20}>
        <VStack>
            <Text textAlign="center" textStyle={'title'} color="neutral.400">Escolha sua atividade favorita</Text>
            <HStack wrap="wrap" gap={{base: 2, md: 2, lg: 6}} p={4} justifyContent="space-around" >
                <VStack>
                    <IconButton aria-label={"futebol"} icon={<FaFutbol color="#46F08F" size={46} />} bg="purple.200" borderRadius="100%" h={{base: 16, md: 20, lg: 20}} w={{base: 16, md: 20, lg: 20}} />
                    <Text textStyle={"h2"} color="neutral.400">Futebol</Text>
                </VStack>
                <VStack>
                    <IconButton aria-label={"Vôlei"} icon={<FaVolleyballBall color="#46F08F" size={46} />} bg="purple.200" borderRadius="100%" h={{base: 16, md: 20, lg: 20}} w={{base: 16, md: 20, lg: 20}} />
                    <Text textStyle={"h2"} color="neutral.400">Vôlei</Text>
                </VStack>
                <VStack>
                    <IconButton aria-label={"Basquete"} icon={<FaBasketballBall color="#46F08F" size={46} />} bg="purple.200" borderRadius="100%" h={{base: 16, md: 20, lg: 20}} w={{base: 16, md: 20, lg: 20}} />
                    <Text textStyle={"h2"} color="neutral.400">Basquete</Text>
                </VStack>
                <VStack>
                    <IconButton aria-label={"Corrida"} icon={<FaRunning color="#46F08F" size={46} />} bg="purple.200" borderRadius="100%" h={{base: 16, md: 20, lg: 20}} w={{base: 16, md: 20, lg: 20}} />
                    <Text textStyle={"h2"} color="neutral.400">Corrida</Text>
                </VStack>
                <VStack>
                    <IconButton aria-label={"Caminhada"} icon={<FaWalking color="#46F08F" size={46} />} bg="purple.200" borderRadius="100%" h={{base: 16, md: 20, lg: 20}} w={{base: 16, md: 20, lg: 20}} />
                    <Text textStyle={"h2"} color="neutral.400">Caminhada</Text>
                </VStack>
                <VStack>
                    <IconButton aria-label={"Academia"} icon={<CgGym color="#46F08F" size={46} />} bg="purple.200" borderRadius="100%" h={{base: 16, md: 20, lg: 20}} w={{base: 16, md: 20, lg: 20}} />
                    <Text textStyle={"h2"} color="neutral.400">Academia</Text>
                </VStack>
            </HStack>
        </VStack>
    </HStack>
    )
}