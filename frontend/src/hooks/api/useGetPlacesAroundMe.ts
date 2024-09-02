interface useGetPlacesAroundMeProps {
  latitude: number
  longitude: number
  radius: number
}

export const useGetPlacesAroundMe = ({
  latitude,
  longitude,
  radius,
}: useGetPlacesAroundMeProps) => {
  //TODO:Substituir por chamada a API
  console.log(`Getting places: ${latitude}, ${longitude}, ${radius}`)
  const places = [
    {
      id: '1',
      name: 'Parque ibirapuera',
      address: 'Av. Pedro Álvares Cabral - Vila Mariana, São Paulo - SP, 04094-050',
      distance: 1.5,
      rating: 4.5,
      image:
        'https://images.unsplash.com/photo-1536244955395-0b8a2a5ab5df?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '2',
      name: 'Arena do Campo de Marte',
      address: 'Av. Santos Dumont, 1979 - Santana, São Paulo - SP, 02012-010',
      distance: 2.5,
      rating: 4.0,
      image:
        'https://images.unsplash.com/photo-1632424007000-c3877f40e1dc?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '3',
      name: 'Shopping Interlagos',
      address: 'Avenida Interlagos, 2255; Jardim Umuarama',
      distance: 3.5,
      rating: 3.5,
      image:
        'https://images.unsplash.com/photo-1677696076058-274ea3f901a2?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '4',
      name: 'Praça Franklin Roosevelt',
      address:
        'Avenida Doutor Assis Ribeiro, 3225 (referência da via que dá acesso aos estacionamentos); Cangaíba',
      distance: 4.5,
      rating: 3.0,
      image:
        'https://images.unsplash.com/photo-1632424007000-c3877f40e1dc?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]

  return places
}
