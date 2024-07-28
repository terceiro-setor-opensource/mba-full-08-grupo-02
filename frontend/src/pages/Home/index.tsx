import { Box, Flex, Stack } from "@chakra-ui/layout"
import { Button, Image, Text } from '@chakra-ui/react'
import LandingPage1 from '../../assets/images/landing1.png'
import LandingPage2 from '../../assets/images/landing2.png'
import { TbGymnastics, TbMapSearch } from "react-icons/tb";
import { FaPeoplePulling } from "react-icons/fa6";
import { GrFormSchedule } from "react-icons/gr";

export const Home = () => {
    return (
        <>
            <Stack maxW="100vw">
                <Flex justifyContent={{ lg: "space-around", md: "center", sm: "center" }} margin={20} >
                    <Box gap="8px" w={{ lg: "50%", md: "90%", sm: "90%" }} >
                        <Text fontSize="3rem" fontWeight="bold">Cidade Ativa</Text>
                        <Text fontSize="20px"  lineHeight="1.5">Prepare-se para embarcar em uma jornada emocionante em direção a uma vida mais ativa e saudável! Estamos empenhados em ajudá-lo a encontrar os melhores lugares para praticar exercícios físicos, seja você um entusiasta experiente ou alguém que está apenas começando sua jornada de condicionamento físico.</Text>
                    </Box>
                    <Box m="0 3rem" display={{ lg: "block", md: "none", sm: "none" }} width="12px" bg="purple.200" borderRadius="8px"></Box>
                    <Box display={{ lg: "block", md: "none", sm: "none" }}>
                        <Image
                            borderRadius="8px"
                            boxSize="100%"
                            objectFit='cover'
                            src={LandingPage1}
                            alt='mulher correndo na rua'
                        />
                    </Box>
                </Flex>
            </Stack>
            <Box
                maxW="100vw"
                w="100%"
                h="300px"
                bgRepeat="no-repeat"
                bgSize="cover"
                bgPosition="right top"
                bgAttachment="local"
                backgroundImage={LandingPage2}
            >
            </Box>
            <Stack maxW="100vw">
                <Box gap="8px" marginY={10} margin={20}>
                    <Text fontSize="3rem" fontWeight="bold">Recursos</Text>
                    <Text fontSize="20px" lineHeight="1.5">Imagine encontrar facilmente uma variedade de locais para se exercitar, desde academias e estúdios de yoga até trilhas para corrida e parques ao ar livre. Nosso objetivo é simplificar sua busca, oferecendo uma plataforma intuitiva e abrangente para descobrir asopções mais adequadas às suas necessidades e preferências.</Text>
                </Box>
                <Flex padding={10} justifyContent="space-around" alignItems="center" bgColor="green.100" bgSize="cover" w="100vw">
                    <Flex paddingY={4} flexDir="column" justifyContent="center" alignItems="center" w="20%">
                        <Button variant='ghost' _hover={{ bg: "transparent" }} cursor="pointer">
                            <Box as={TbGymnastics} color="purple.100" size="78px" />
                        </Button>
                        <Text textAlign="center" pt={10} color="purple.100" fontWeight="bold" lineHeight="1.5" >Aumente sua qualidade de vida</Text>
                    </Flex>
                    <Flex paddingY={4} flexDir="column" justifyContent="center" alignItems="center" w="20%">
                        <Button variant='ghost' _hover={{ bg: "transparent" }} cursor="pointer">
                            <Box as={TbMapSearch} color="purple.100" size="68px" />
                        </Button>
                        <Text textAlign="center" pt={10} textStyle={'p'} color="purple.100" fontWeight="bold" lineHeight="1.5" >Descubra os melhores espaços para se exercictar na sua região</Text>
                    </Flex>
                    <Flex paddingY={4} flexDir="column" justifyContent="center" alignItems="center" w="20%">
                        <Button variant='ghost' _hover={{ bg: "transparent" }} cursor="pointer">
                            <Box as={FaPeoplePulling} color="purple.100" size="68px" />
                        </Button>
                        <Text textAlign="center" pt={10} textStyle={'p'} color="purple.100" fontWeight="bold" lineHeight="1.5" >Engaje seus amigos para uma vida mais saudável </Text>
                    </Flex>
                    <Flex paddingY={4} flexDir="column" justifyContent="center" alignItems="center" w="20%">
                        <Button variant='ghost' _hover={{ bg: "transparent" }} cursor="pointer">
                            <Box as={GrFormSchedule} color="purple.100" size="78px" />
                        </Button>
                        <Text textAlign="center" pt={10} textStyle={'p'} color="purple.100" fontWeight="bold" lineHeight="1.5" >Crie e agende eventos para a sua comunidade </Text>
                    </Flex>
                </Flex>
            </Stack>
        </>
    )
}