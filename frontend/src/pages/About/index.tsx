import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Link,
  Image,
  SimpleGrid,
  Avatar,
  Button,
} from '@chakra-ui/react'
import AboutImg from '../../assets/images/about.jpg'

export default function About() {
  const team = [
    {
      name: 'Luma Montes',
      role: 'Desenvolvedora',
      github: 'https://github.com/lumamontes',
    },
    {
      name: 'Rafael Baptista',
      role: 'Desenvolvedor',
      github: 'https://github.com/rafaeloel',
    },
    {
      name: 'Robert Alexandre de Almeida',
      role: 'Desenvolvedor',
      github: 'https://github.com/robertalxa',
    },
  ]

  return (
    <Box>
      <Box position="relative" textAlign="center">
        <Image
          src={AboutImg}
          alt="Sobre Nós"
          objectFit="cover"
          w="full"
          h={{ base: '40vh', md: '60vh' }}
        />

        <Box position="absolute" inset="0" bg="blackAlpha.600" zIndex="1" />

        <Flex
          direction="column"
          align="center"
          justify="center"
          position="absolute"
          inset="0"
          color="white"
          zIndex="2"
        >
          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '6xl' }}
            fontWeight="bold"
          >
            Sobre Nós
          </Heading>
          <Text fontSize="xl" mt={4} maxW="3xl">
            O <b>Cidade Ativa</b> é um projeto desenvolvido por estudantes da{' '}
            <b>Faculdade Impacta</b>, como parte da disciplina do Bootcamp. Este
            é um projeto de código aberto voltado ao <b>terceiro setor</b>, com
            o objetivo de promover saúde, bem-estar e acessibilidade a práticas
            esportivas.
          </Text>
        </Flex>
      </Box>

      <Box maxW="7xl" mx="auto" py={16} px={6}>
        <Heading
          as="h2"
          fontSize={{ base: '4xl', sm: '5xl' }}
          fontWeight="semibold"
          color="teal.600"
          textAlign="center"
          mb={6}
        >
          Nossa Missão
        </Heading>
        <Text
          fontSize="lg"
          color="gray.700"
          textAlign="center"
          maxW="3xl"
          mx="auto"
          lineHeight="taller"
        >
          Nossa missão é conectar pessoas a espaços esportivos de forma simples
          e acessível. Queremos tornar a prática de esportes e atividades
          físicas algo mais fácil para todos, promovendo um estilo de vida mais
          saudável e ativo.
        </Text>
      </Box>

      <Box maxW="7xl" mx="auto" py={16} px={6}>
        <Heading
          as="h2"
          fontSize={{ base: '4xl', sm: '5xl' }}
          fontWeight="semibold"
          color="teal.600"
          textAlign="center"
          mb={6}
        >
          Nossa Equipe
        </Heading>
        <Text
          fontSize="lg"
          color="gray.700"
          textAlign="center"
          maxW="3xl"
          mx="auto"
          mb={10}
        >
          Somos um grupo dinâmico de profissionais dedicados a criar soluções
          acessíveis e impactantes para o terceiro setor.
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {team.map((member) => (
            <VStack
              key={member.name}
              spacing={4}
              textAlign="center"
              bg="white"
              p={6}
              shadow="sm"
              borderRadius="lg"
            >
              <Avatar
                size="2xl"
                name={member.name}
                src={`${member.github}.png`}
              />
              <Text fontSize="lg" fontWeight="bold" color="gray.900">
                {member.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {member.role}
              </Text>
              <Link
                href={member.github}
                isExternal
                color="teal.500"
                fontWeight="medium"
                _hover={{ textDecoration: 'underline' }}
              >
                Ver GitHub
              </Link>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>

      <Box py={16} px={6}>
        <VStack spacing={6} textAlign="center" maxW="3xl" mx="auto">
          <Heading as="h2" size="xl" color="teal.600">
            Contribuições
          </Heading>
          <Text fontSize="lg" color="gray.700">
            O <b>Cidade Ativa</b> é um projeto de código aberto. Convidamos você
            a contribuir, compartilhar ideias e ajudar a expandir esta
            plataforma para impactar ainda mais pessoas.
          </Text>
          <Button
            as="a"
            href="https://github.com/impacta-full-08/cidade-ativa"
            colorScheme="teal"
            size="lg"
            target="_blank"
          >
            Veja Como Contribuir
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}
