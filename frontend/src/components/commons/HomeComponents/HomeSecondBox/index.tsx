import { Box, HStack, Stack, VStack } from "@chakra-ui/layout"
import { Hide, Text } from '@chakra-ui/react'
import { TbGymnastics, TbMapSearch, TbFriends, TbCalendar } from "react-icons/tb"

export const HomeSecondBox = () => {
    return (
        <Box gap={2}>
            <VStack gap="8px" p={{base: "2rem", md: "2rem", lg: 20}} alignItems="center" justifyContent="center">
                <Box width="95%">
                <Text textStyle={'title'}>Recursos</Text>
                <Text textStyle={'subtitle'} lineHeight="1.5">Imagine encontrar facilmente uma variedade de locais para se exercitar, desde academias e estúdios de yoga até trilhas para corrida e parques ao ar livre. Nosso objetivo é simplificar sua busca, oferecendo uma plataforma intuitiva e abrangente para descobrir asopções mais adequadas às suas necessidades e preferências.</Text>
                </Box>
            </VStack>
            <Hide below="md">
            <HStack paddingY={4} wrap="wrap" justifyContent="space-around" bgColor="green.100" bgSize="cover">
                <VStack justifyContent="start" alignItems="center">
                    <Box as={TbGymnastics} color="purple.100" size="4rem" />
                    <Text maxW="200px" textAlign="center" pt={4} color="purple.100" fontWeight="bold" lineHeight="1.5" >Aumente sua qualidade de vida</Text>
                </VStack>
                <VStack justifyContent="start" alignItems="center">
                    <Box as={TbMapSearch} color="purple.100" size="4rem" />
                    <Text maxW="200px" textAlign="center" pt={4} textStyle={'p'} color="purple.100" fontWeight="bold" lineHeight="1.5" >Descubra os melhores espaços para se exercictar na sua região</Text>
                </VStack>
                <VStack justifyContent="start" alignItems="center">
                    <Box as={TbFriends} color="purple.100" size="4rem" />
                    <Text maxW="200px" textAlign="center" pt={4} textStyle={'p'} color="purple.100" fontWeight="bold" lineHeight="1.5" >Engaje seus amigos para uma vida mais saudável </Text>
                </VStack>
                <VStack justifyContent="start" alignItems="center">
                    <Box as={TbCalendar} color="purple.100" size="4rem" />
                    <Text maxW="200px" textAlign="center" pt={4} textStyle={'p'} color="purple.100" fontWeight="bold" lineHeight="1.5" >Crie e agende eventos para a sua comunidade </Text>
                </VStack>
            </HStack>
            </Hide>
        </Box>
    )
}