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
import { useAuth } from '@/hooks/useAuth';
import { stackStyles } from '../Dashboard/styles';
import { BiSearch } from 'react-icons/bi';
import { ProfileFormData, profileSchema } from './schema';
import { getAddressByPostalCode } from '@/services/address.service';
import { profileService } from '@/services/profile.service';
import { toast } from 'react-toastify';


const ProfileForm = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(user?.profile_image || null);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
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

  const handleSearchCep = async () => {
    const postalcode = getValues("address.postalcode");

    if (!postalcode) {
      return;
    }
    setIsAddressLoading(true);
    const res = await getAddressByPostalCode(postalcode);

    if(!res) {
      setIsAddressLoading(false);
      alert("CEP não encontrado");
      return;
    }
    setValue("address.streetname", res.address_name);
    setValue("address.neighborhood", res.district);
    setValue("address.city", res.city);
    setValue("address.state", res.state);
    setValue("address.latitude", res.lat);
    setValue("address.longitude", res.lng);
    setIsAddressLoading(false);
  }  

  const onSubmit = async (data: ProfileFormData) => {
      console.log('data', data);
      await profileService.updateProfile(data);
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
            <FormControl isInvalid={!!errors.address?.postalcode}>
                <FormLabel>CEP</FormLabel>
            <HStack spacing={4} width="100%" justifyContent="space-between" alignItems="center">
                <Input {...register("address.postalcode")}
                  onBlur={handleSearchCep} 
                />
                <Button
                  colorScheme="purple"
                  size="sm"
                  onClick={handleSearchCep}
                >
                    <BiSearch />
                </Button>
            </HStack>
                <FormErrorMessage>{errors.address?.postalcode?.message}</FormErrorMessage>
                {/* //Botão para pesquisar endereço */}
              </FormControl>

            <FormControl isInvalid={!!errors.address?.streetname}>
              <FormLabel>Rua</FormLabel>
              <Input {...register("address.streetname")} disabled={isAddressLoading} />
              <FormErrorMessage>{errors.address?.streetname?.message}</FormErrorMessage>
            </FormControl>

            <HStack>
              <FormControl isInvalid={!!errors.address?.addressnumber}>
                <FormLabel>Número</FormLabel>
                <Input {...register("address.addressnumber")} disabled={isAddressLoading} />
                <FormErrorMessage>{errors.address?.addressnumber?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.address?.neighborhood}>
                <FormLabel>Bairro</FormLabel>
                <Input {...register("address.neighborhood")} disabled={isAddressLoading} />
                <FormErrorMessage>{errors.address?.neighborhood?.message}</FormErrorMessage>
              </FormControl>
            </HStack>

            <HStack>
              <FormControl isInvalid={!!errors.address?.city}>
                <FormLabel>Cidade</FormLabel>
                <Input {...register("address.city")} disabled={isAddressLoading} />
                <FormErrorMessage>{errors.address?.city?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.address?.state}>
                <FormLabel>Estado</FormLabel>
                <Input {...register("address.state")} disabled={isAddressLoading} />
                <FormErrorMessage>{errors.address?.state?.message}</FormErrorMessage>
              </FormControl>
            </HStack>
            {/* //Hidden inputs for lat + long */}
            <Input type="hidden" {...register("address.latitude")} />
            <Input type="hidden" {...register("address.longitude")} />
          </Box>

          {/* Submit Button */}
          <Button type="submit" colorScheme="green" width="full" isLoading={isSubmitting}>
            Atualizar Perfil
          </Button>
        </VStack>
      </Stack>
    </Box>
  );
};

export default ProfileForm;
