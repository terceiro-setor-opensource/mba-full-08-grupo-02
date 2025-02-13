import { useState, useEffect } from 'react'
import { IconButton } from '@chakra-ui/react'
import { TiHeartOutline } from 'react-icons/ti'
import { placeService } from '@/services/place.service'
import { jwtDecode, JwtPayload  } from "jwt-decode";
import { useParams } from 'react-router-dom';

interface UserToken extends JwtPayload {
  id: string;
  email: string;
  userid: string;
}

export const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const token = localStorage.getItem('@cidade-ativa:auth_token');

        if (!id) {
          console.error('Local não definido')
          return;
        }

        if (!token) {
          console.error('Usuário não autenticado')
          return;
        }

        const decoded: UserToken = jwtDecode(token);
        const userid = String(decoded.userid);
        const placeid = id;

        // Chama o método isFavoritePlace e define o estado isFavorite
        const favoriteStatus = await placeService.isFavoritePlace({ placeid, userid });
        setIsFavorite(favoriteStatus);

      } catch (error) {
        console.error("Erro ao verificar se é favorito:", error);
      }
    };

    // Verifica se o lugar já é favorito quando o componente for carregado
    checkIfFavorite();
  }, []);


  const handleFavorite = async () => {
    try {
      
      const token = localStorage.getItem('@cidade-ativa:auth_token') // Pegando o userId dentro da função para evitar erro ao renderizar
      const placeid = localStorage.getItem('placeid') // Pegando o placeId dentro da função para evitar erro ao renderizar
      const favoriteId = localStorage.getItem('favoriteid') // Pegando o placeId dentro da função para evitar erro ao renderizar


      if (!token) {
        console.error('Usuário não autenticado')
        return
      }

      const decoded: UserToken = jwtDecode(token);
      const userid = String(decoded.userid);

      if (!placeid) {
        console.error('Local não identificado')
        return
      }

      if (!isFavorite) {
        // Favoritar: enviar POST
        await placeService.postFavoritePlace({ placeid, userid })
        setIsFavorite(true)
      } else {
        // Desfavoritar: enviar DELETE

        if(!favoriteId){
          console.error('Não esta marcado como favorito')
          return
        }

        await placeService.removeFavoritePlace({ favoriteId })
        localStorage.removeItem("favoriteid");
        setIsFavorite(false)
      }

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <IconButton aria-label="Favorite" rounded="full" variant="outline"
    onClick={handleFavorite}
    // Cor definida dependendo do estado isFavorite
    color={isFavorite ? 'red.500' : 'gray.400'}
    _hover={{ color: 'red.500' }}>
      <TiHeartOutline width="100%" />
    </IconButton>
  )
}
