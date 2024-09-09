import { useTranslation } from 'react-i18next'
import * as z from 'zod'

export const useSignInSchema = () => {
  const { t } = useTranslation()

  return z.object({
    email: z.string().email({
      message: t('formSignUp.errors.emailInvalid'),
    }),
    password: z
      .string()
      .min(8, {
        message: t('formSignUp.errors.passwordTooShort'),
      })
      .nonempty({
        message: t('formSignUp.errors.passwordRequired'),
      }),
  })
}
