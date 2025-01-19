import {
  FaBasketballBall,
  FaFutbol,
  FaRunning,
  FaVolleyballBall,
  FaWalking,
} from 'react-icons/fa'
import { CgGym } from 'react-icons/cg'
import {
  TbGymnastics,
  TbMapSearch,
  TbFriends,
  TbCalendar,
} from 'react-icons/tb'

const chooseActivity = [
  {
    activity: 'Futebol',
    icon: FaFutbol,
    id: 6,
  },
  {
    activity: 'Vôlei',
    icon: FaVolleyballBall,
    id: 7,
  },
  {
    activity: 'Basquete',
    icon: FaBasketballBall,
    id: 8,
  },
  {
    activity: 'Corrida',
    icon: FaRunning,
    id: 1,
  },
  {
    activity: 'Caminhada',
    icon: FaWalking,
    id: 2,
  },
  {
    activity: 'Academia',
    icon: CgGym,
    id: 9,
  },
]

const bannerInformation = [
  {
    description: 'Aumente sua qualidade de vida',
    icon: TbGymnastics,
  },
  {
    description:
      'Descubra os melhores espaços para se exercictar na sua região',
    icon: TbMapSearch,
  },
  {
    description: 'Engaje seus amigos para uma vida mais saudável',
    icon: TbFriends,
  },
  {
    description: 'Crie e agende eventos para a sua comunidade',
    icon: TbCalendar,
  },
]

export { chooseActivity, bannerInformation }
