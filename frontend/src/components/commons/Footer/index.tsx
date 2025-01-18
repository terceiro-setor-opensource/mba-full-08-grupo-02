import { ReactNode } from 'react'
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

function LargeWithAppLinksAndSocial() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Cidade Ativa</ListHeader>
            <Box as="a" href={'#'}>
              Entre em contato
            </Box>
            <Box as="a" href={'#'}>
              cidadeativa@suporte.com
            </Box>
            <Box as="a" href={'#'}>
              +1-2345-6789
            </Box>
            <Box as="a" href={'#'}>
              São Paulo, Brasil
            </Box>
            <Container
              as={Stack}
              maxW={'6xl'}
              py={4}
              direction={{ base: 'column', md: 'row' }}
              spacing={4}
              justify={{ md: 'space-between' }}
              align={{ md: 'center' }}
            >
              <Stack direction={'row'} spacing={6}>
                <SocialButton label={'Twitter'} href={'#'}>
                  <FaTwitter />
                </SocialButton>
                <SocialButton label={'YouTube'} href={'#'}>
                  <FaYoutube />
                </SocialButton>
                <SocialButton label={'Instagram'} href={'#'}>
                  <FaInstagram />
                </SocialButton>
              </Stack>
            </Container>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Produtos</ListHeader>
            <Box as="a" href={'#'}>
              Locais
            </Box>
            <Box as="a" href={'#'}>
              Eventos
            </Box>
            <Box as="a" href={'#'}>
              Benefícios
            </Box>
            <Box as="a" href={'#'}>
              Login
            </Box>
            <Box as="a" href={'#'}>
              Cadastro
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Sobre</ListHeader>
            <Box as="a" href={'/about'}>
              Faculdade Impacta
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export const Footer = () => {
  return <LargeWithAppLinksAndSocial />
}
