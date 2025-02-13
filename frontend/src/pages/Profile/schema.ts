import { z } from "zod";

export const profileSchema = z.object({
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

export type ProfileFormData = z.infer<typeof profileSchema>;
