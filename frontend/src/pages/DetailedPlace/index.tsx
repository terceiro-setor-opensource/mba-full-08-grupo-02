import { BackButton } from '@/components/commons/BackButton'
import { Place } from '@/models/place'
import { placeService } from '@/services/place.service'
import { Box, Stack, Text } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PlaceDetails } from '@/components/Dashboard/PlaceDetails'
import { PlaceDetailsSkeleton } from '@/components/Dashboard/LoadingPlaceSkeleton/details'

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
      setLoading(true)
      try {
        if(!id) return
        const response = await placeService.getById(parseInt(id))
        setPlace(response)
      } catch (err) {
        setError((err as Error).message || 'Failed to fetch places.')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPlace()
  }, [])

  return (
    <>
      <Box>
        <Stack sx={stackStyles}>
          <Stack spacing={8} paddingTop={12} alignItems={'start'}>
            <BackButton />
            {loading ? (
              <PlaceDetailsSkeleton />
            ) : error ? (
              <Text color="red.500">{error}</Text>
            ) : (
              <Stack sx={stackContentStyles}>
                <PlaceDetails place={place as Place} />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
