import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { Stack, VStack } from '@chakra-ui/layout'
import { useState } from 'react'

export const SignUp = () => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <VStack height={'100vh'} pt={36}>
      <Stack w={{ base: '90%', md: '80%', lg: '40%' }}>
        <VStack pb={20} alignItems="flex-start">
          <Text textStyle={'h1'}>Crie sua conta!</Text>
          <Text textStyle={'subtitle'} textColor="neutral.400">
            É gratuito e simples!
          </Text>
        </VStack>
        <VStack gap={28} pb={20}>
          <FormControl isRequired>
            <FormLabel mt={12}>Nome completo</FormLabel>
            <Input size="lg" placeholder="Nome completo" />
            <FormLabel mt={12}>Email</FormLabel>
            <Input type="email" size="lg" placeholder="Email" />
            <FormLabel mt={12}>Senha</FormLabel>
            <InputGroup size="lg">
              <Input type={show ? 'text' : 'password'} placeholder="Senha" />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" onClick={() => setShow(!show)}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Checkbox mt={12}>Concordo com os Termos e Condições</Checkbox>
          </FormControl>
          <Button
            borderRadius="20px"
            w="100%"
            bg="purple.200"
            color="neutral.100"
            borderColor="purple.200"
          >
            Cadastrar
          </Button>
        </VStack>
      </Stack>
    </VStack>
  )
}
