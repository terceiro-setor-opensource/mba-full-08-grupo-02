import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Avatar,
  Text,
  HStack,
  Box,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { stackStyles } from '../Dashboard/styles';

const profileSchema = z.object({
  profileImage: z.string().optional(),
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  birthdate: z.string().optional(),
  phone_number: z.string().optional(),
  address: z.object({
    streetname: z.string().min(2, "Endereço é obrigatório"),
    addressnumber: z.string().min(1, "Número é obrigatório"),
    reference: z.string().optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    neighborhood: z.string().min(2, "Bairro é obrigatório"),
    city: z.string().min(2, "Cidade é obrigatória"),
    state: z.string().min(2, "Estado é obrigatório"),
    postalcode: z.string().min(8, "CEP é obrigatório"),
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileForm = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(user?.profile_image || null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profileImage: user?.profile_image || '',
      name: user?.name || '',
      email: user?.email || '',
      birthdate: user?.birthdate || '',
      phone_number: user?.phone_number || '',
      address: {
        streetname: user?.address?.streetname || '',
        addressnumber: user?.address?.addressnumber || '',
        reference: user?.address?.reference || '',
        latitude: user?.address?.latitude || '',
        longitude: user?.address?.longitude || '',
        neighborhood: user?.address?.neighborhood || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        postalcode: user?.address?.postalcode || '',
      },
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        profileImage: user.profile_image || '',
        name: user.name || '',
        email: user.email || '',
        birthdate: user.birthdate || '',
        phone_number: user.phone_number || '',
        address: {
          streetname: user.address?.streetname || '',
          addressnumber: user.address?.addressnumber || '',
          reference: user.address?.reference || '',
          latitude: user.address?.latitude || '',
          longitude: user.address?.longitude || '',
          neighborhood: user.address?.neighborhood || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          postalcode: user.address?.postalcode || '',
        },
      });
      setProfileImage(user.profile_image || null);
    }
  }, [user, reset]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        setValue("profileImage", base64String);
      };
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log("Form Submitted:", data);
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <Box paddingY={'2rem'}>
      <Stack sx={stackStyles}>
        <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} width="100%" maxW="500px" marginLeft={'auto'} marginRight={'auto'}>
          
          {/* Profile Image */}
          <FormControl>
            <FormLabel>Foto de Perfil</FormLabel>
            <HStack>
              <Avatar size="xl" src={profileImage || ""} />
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
            </HStack>
          </FormControl>

          {/* Name */}
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Nome</FormLabel>
            <Input {...register("name")} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          {/* Email */}
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register("email")} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          {/* Birthdate */}
          <FormControl isInvalid={!!errors.birthdate}>
            <FormLabel>Data de Nascimento</FormLabel>
            <Input type="date" {...register("birthdate")} />
            <FormErrorMessage>{errors.birthdate?.message}</FormErrorMessage>
          </FormControl>

          {/* Phone Number */}
          <FormControl>
            <FormLabel>Telefone</FormLabel>
            <Input type="tel" {...register("phone_number")} />
          </FormControl>

          {/* Address Fields */}
          <Box width="100%">
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Endereço
            </Text>

            <FormControl isInvalid={!!errors.address?.streetname}>
              <FormLabel>Rua</FormLabel>
              <Input {...register("address.streetname")} />
              <FormErrorMessage>{errors.address?.streetname?.message}</FormErrorMessage>
            </FormControl>

            <HStack>
              <FormControl isInvalid={!!errors.address?.addressnumber}>
                <FormLabel>Número</FormLabel>
                <Input {...register("address.addressnumber")} />
                <FormErrorMessage>{errors.address?.addressnumber?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.address?.neighborhood}>
                <FormLabel>Bairro</FormLabel>
                <Input {...register("address.neighborhood")} />
                <FormErrorMessage>{errors.address?.neighborhood?.message}</FormErrorMessage>
              </FormControl>
            </HStack>

            <HStack>
              <FormControl isInvalid={!!errors.address?.postalcode}>
                <FormLabel>CEP</FormLabel>
                <Input {...register("address.postalcode")} />
                <FormErrorMessage>{errors.address?.postalcode?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.address?.city}>
                <FormLabel>Cidade</FormLabel>
                <Input {...register("address.city")} />
                <FormErrorMessage>{errors.address?.city?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.address?.state}>
                <FormLabel>Estado</FormLabel>
                <Input {...register("address.state")} />
                <FormErrorMessage>{errors.address?.state?.message}</FormErrorMessage>
              </FormControl>
            </HStack>
          </Box>

          {/* Submit Button */}
          <Button type="submit" colorScheme="blue" width="full" isLoading={isSubmitting}>
            Atualizar Perfil
          </Button>
        </VStack>
      </Stack>
    </Box>
  );
};

export default ProfileForm;
