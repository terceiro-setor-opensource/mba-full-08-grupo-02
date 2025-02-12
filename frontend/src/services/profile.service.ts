import { toast } from 'react-toastify'
import api from './api'
import { ProfileFormData } from '@/pages/Profile/schema'

class ProfileService {
  private basePath = '/profile'

  public async updateProfile(profile: ProfileFormData) {
    try {
      const token = localStorage.getItem('@cidade-ativa:auth_token')?.replace(/"/g, '')
      console.log('token', token)
      const response = await api.put(this.basePath, profile, {
        headers: {
          'Accept': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      })
      toast.success('Perfil atualizado com sucesso!')
      return response.data
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    }
  }
}

export const profileService = new ProfileService()
