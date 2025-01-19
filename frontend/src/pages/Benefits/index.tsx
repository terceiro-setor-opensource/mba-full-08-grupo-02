import { Box, Stack } from '@chakra-ui/layout'
import { Banner } from '@/components/Benefits/Banner'
import { Grid } from '@chakra-ui/react'
import { BenefitCard } from '@/components/Benefits/BenefitCards'
import BackButton from '@/components/Benefits/ButtonBack'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { benefitService, getBenefitsByPlaceIdResponse } from '@/services/benefits.service'
import { toast } from 'react-toastify'

export const Benefits = () => {
  const {id} = useParams()
  const [benefitsData, setBenefitsData] = useState<getBenefitsByPlaceIdResponse | null>(null)

  useEffect(() => {
    if(id){
      const fetchBenefits = async () => {
        try {
          const response = await benefitService.getBenefitsByPlaceId(id)
          setBenefitsData(response)
        } catch (error) {
          toast.error('Erro ao buscar benefícios')          
        }
      }
      fetchBenefits()
    }
  }, [id])

  return (
    <>
      <Stack>
        <BackButton />
        <Banner activities={benefitsData?.activities}/>
      </Stack>
      <Box
        maxW="100vw"
        h="10px"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        bgAttachment="local"
      ></Box>
      <Stack>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={2}
          padding={8}
          margin="auto"
          bgPosition="center"
        >
          {benefitsData?.benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.name}
              description={benefit.description}
              iconColor={benefit.icon}
            />
          ))}
        </Grid>
      </Stack>
    </>
  )
}
