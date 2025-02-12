import { BackButton } from '@/components/commons/BackButton'
import { Place } from '@/models/place'
import { placeService } from '@/services/place.service'
import { Box, Stack, Text } from '@chakra-ui/layout'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PlaceDetails } from '@/components/Dashboard/PlaceDetails'

const stackStyles = {
  width: {
    base: '90%',
    md: '70%',
  },
  textAlign: 'center',
  margin: 'auto',
}

const stackContentStyles = {
  width: {
    base: '100%',
    md: '100%',
  },
  textAlign: 'center',
  margin: 'auto',
}

export const DetailedPlace = () => {
  const [place, setPlace] = useState<Place | {}>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchPlace = async () => {
      
      if (!id) {
        setError("ID não definido");
        return;
      }
            setLoading(true)
      try {
        const response = await placeService.getById(parseInt(id))
        localStorage.setItem("placeid", String(response.id))
        setPlace(response)
      } catch (err) {
        setError((err as Error).message || 'Failed to fetch places.')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPlace()
  }, [])

  console.log(place)

  return (
    <>
      <Box>
        <Stack sx={stackStyles}>
          <Stack spacing={8} paddingTop={12} alignItems={'start'}>
            <BackButton />
            {loading ? (
              <Text>{t('loading')}</Text>
            ) : error ? (
              <Text color="red.500">{error}</Text>
            ) : (
              <Stack sx={stackContentStyles}>
                <PlaceDetails place={place} />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
