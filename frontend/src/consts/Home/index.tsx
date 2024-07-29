import { FaBasketballBall, FaFutbol, FaRunning, FaVolleyballBall, FaWalking } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { TbGymnastics, TbMapSearch, TbFriends, TbCalendar } from "react-icons/tb"


const chooseActivity = [
    {
        activity: "Futebol",
        icon: FaFutbol
    },
    {
        activity: "Vôlei",
        icon: FaVolleyballBall

    },
    {
        activity: "Basquete",
        icon: FaBasketballBall

    },
    {
        activity: "Corrida",
        icon: FaRunning

    },
    {
        activity: "Caminhada",
        icon: FaWalking

    },
    {
        activity: "Academia",
        icon: CgGym

    },
]

const bannerInformation = [
    {
        description: "Aumente sua qualidade de vida",
        icon: TbGymnastics
    },
    {
        description: "Descubra os melhores espaços para se exercictar na sua região",
        icon: TbMapSearch

    },
    {
        description: "Engaje seus amigos para uma vida mais saudável",
        icon: TbFriends

    },
    {
        description: "Crie e agende eventos para a sua comunidade",
        icon: TbCalendar

    }
]

export { chooseActivity, bannerInformation }