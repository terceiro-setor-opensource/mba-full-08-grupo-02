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
  import { HStack, Stack, VStack } from '@chakra-ui/layout'
  import { useState } from 'react'
  import { useForm } from 'react-hook-form'
  import { useTranslation } from 'react-i18next'
  import { FormButton } from '@/components/commons/FormButton'
  import { SocialMedia } from '@/components/commons/SocialMedia'
  import { Link } from 'react-router-dom'
  import theme from '@/theme'
  
  interface IFormInputSignIn {
    email: string
    password: string
  }
  
  export const SignIn = () => {
    const [show, setShow] = useState<boolean>(false)
  
    const { t } = useTranslation()
  
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm<IFormInputSignIn>()
  
    const onSubmit = (data: any) => {
      console.log(data)
    }
  
    return (
      <VStack height={'100%'} marginY={theme.space[12]} justifyContent="center">
        <Stack w={{ base: '90%', md: '80%', lg: '40%' }}>
          <VStack pb={20} alignItems="flex-start">
            <Text textStyle={'h1'}> {t('welcomeAgain')}</Text>
            <Text textStyle={'subtitle'} textColor="neutral.400">
              {t('infoCredentials')}
            </Text>
          </VStack>
          <VStack gap={28} pb={20} w="100%">
            <form
              style={{
                width: '100%',
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email" mt={12}>
                  {t('formSignUp.email')}
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
                  {t('formSignUp.password')}
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
              <FormButton isLoading={isSubmitting} title={t('entry')} />
            </form>
          </VStack>
          <SocialMedia />
          <HStack justifyContent="center" pt={theme.space[36]}>
            <Text color={theme.colors.neutral['400']}>{t('doentAccount')}</Text>
            <Link color={theme.colors.neutral['500']} to={'/cadastro'}>
              {t('formSignUp.register')}
            </Link>
          </HStack>
        </Stack>
      </VStack>
    )
  }
  