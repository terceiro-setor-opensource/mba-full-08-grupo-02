import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { Stack, VStack } from '@chakra-ui/layout'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface IFormInput {
  name: string
  email: string
  password: string
  terms: boolean
}

export const SignUp = () => {
  const [show, setShow] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <VStack height={'100vh'} pt={36}>
      <Stack w={{ base: '90%', md: '80%', lg: '40%' }}>
        <VStack pb={20} alignItems="flex-start">
          <Text textStyle={'h1'}>Crie sua conta</Text>
          <Text textStyle={'subtitle'} textColor="neutral.400">
            É gratuito e simples!
          </Text>
        </VStack>
        <VStack gap={28} pb={20} w="100%">
          <form
            style={{
              width: '100%',
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl isInvalid={!!errors.name}>
              <FormLabel mt={12}>Nome completo</FormLabel>
              <Input
                size="lg"
                placeholder="Nome completo"
                {...register('name', {
                  required: true,
                })}
              />
              {!!errors.name && <FormErrorMessage>Nome é obrigatório</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email" mt={12}>
                Email
              </FormLabel>
              <Input
                type="email"
                size="lg"
                placeholder="Email"
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Entre com um email válido',
                  },
                })}
              />
              {!!errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password" mt={12}>
                Senha
              </FormLabel>
              <InputGroup size="lg">
                <Input
                  type={show ? 'text' : 'password'}
                  placeholder="Senha"
                  {...register('password', {
                    required: 'Senha é obrigatória',
                    minLength: {
                      value: 8,
                      message: 'A senha deve conter no mínimo 8 caracteres',
                    },
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" onClick={() => setShow(!show)}>
                    {show ? 'Ocultar' : 'Exibir'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!!errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.terms}>
              <Checkbox
                {...register('terms', {
                  required: true,
                })}
                mt={12}
              >
                Concordo com os Termos e Condições
              </Checkbox>
              {!!errors.terms && <FormErrorMessage>O termo é obrigatório</FormErrorMessage>}
            </FormControl>
            <Button
              mt={28}
              isLoading={isSubmitting}
              borderRadius="20px"
              w="100%"
              bg="purple.200"
              color="neutral.100"
              borderColor="purple.200"
              type="submit"
            >
              Cadastrar
            </Button>
          </form>
        </VStack>
      </Stack>
    </VStack>
  )
}
