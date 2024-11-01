import { Box, Stack } from '@chakra-ui/layout'
import { Banner } from '@/components/BenefitsCiclism/Banner'
import { Grid } from '@chakra-ui/react';
import { FaHeartbeat, FaWeight, FaDumbbell, FaRegSmile, FaBone, FaWind, FaArrowUp, FaArrowDown, FaRunning } from 'react-icons/fa';
import { BenefitCard } from '@/components/BenefitsCiclism/BenefitCards'
import { TbGymnastics } from 'react-icons/tb';
import BackButton from '@/components/BenefitsCiclism/ButtonBack';


const benefits = [
    {
      icon: <FaHeartbeat />,
      title: "Risco cardiovascular",
      description: "Pedalar regularmente pode reduzir o risco de doenças cardiovasculares, como hipertensão, ataques cardíacos e derrames.",
      iconColor: "red.500",
    },
    {
      icon: <FaWeight />,
      title: "Controle do peso",
      description: "O ciclismo é eficaz para queimar calorias e ajudar na perda ou manutenção de peso saudável.",
      iconColor: "gray.500",
    },
    {
      icon: <FaDumbbell />,
      title: "Fortalecimento muscular",
      description: "Fortalece os músculos das pernas, incluindo quadríceps, isquiotibiais, panturrilhas e glúteos.",
      iconColor: "purple.500",
    },
    {
        icon: <FaRegSmile />,
        title: "Melhora na saúde mental",
        description: "Fortalece os músculos das pernas, incluindo quadríceps, isquiotibiais, panturrilhas e glúteos.",
        iconColor: "yellow.500",
      },
      {
        icon: <FaWind />,
        title: "Saúde respiratória",
        description: "Fortalece os músculos das pernas, incluindo quadríceps, isquiotibiais, panturrilhas e glúteos.",
        iconColor: "blue.500",
      },
      {
        icon: <TbGymnastics />,
        title: "Coordenação e Equilíbrio",
        description: "Fortalece os músculos das pernas, incluindo quadríceps, isquiotibiais, panturrilhas e glúteos.",
        iconColor: "green.500",
      },
      {
        icon: <FaBone />,
        title: "Articulação e Ossos",
        description: "Fortalece os músculos das pernas, incluindo quadríceps, isquiotibiais, panturrilhas e glúteos.",
        iconColor: "purple.500",
      },
      {
        icon: <FaArrowUp />,
        title: "Benefícios para o Sistema Imunológico",
        description: "Fortalece os músculos das pernas, incluindo quadríceps, isquiotibiais, panturrilhas e glúteos.",
        iconColor: "gray.500",
      },
      {
        icon: <FaArrowDown />,
        title: "Redução do Risco de Diabetes Tipo 2",
        description: "Fortalece os músculos das pernas, incluindo quadríceps, isquiotibiais, panturrilhas e glúteos.",
        iconColor: "black.500",
      },
      {
        icon: <FaRunning />,
        title: "Bem-Estar Geral",
        description: "Fortalece os músculos das pernas, incluindo quadríceps, isquiotibiais, panturrilhas e glúteos.",
        iconColor: "purple.500",
      },
      
  ];

export const Benefits = () => {
  return (
    <>
      <Stack>
        < BackButton />
        < Banner />
      </Stack>
      <Box 
        maxW="100vw"
        h="10px"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        bgAttachment="local">

      </Box>
      <Stack >
      <Grid  templateColumns="repeat(3, 1fr)" gap={2} padding={8} margin="auto" bgPosition="center">
        {benefits.map((benefit, index) => (
            <BenefitCard
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            iconColor={benefit.iconColor}
            />
        ))}
        </Grid>
      </Stack>
    </>
  )
}
