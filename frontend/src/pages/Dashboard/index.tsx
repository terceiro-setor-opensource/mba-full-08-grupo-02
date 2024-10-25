import { useEffect, useState } from 'react'
import { t } from 'i18next'
import { Box, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import { ChooseActivity } from '@/components/Home/ChooseActivity'
import { SportSelect } from '@/components/Dashboard/SportSelect'
import { SearchAndFilter } from '@/components/Dashboard/SearchAndFilter'
import { LocationSelect } from '@/components/Dashboard/LocationSelect'
import PlaceCard from '@/components/Dashboard/PlaceCard'
import { placeService } from '@/services/place.service'
import { Place } from '@/models/place'
import { useNavigate } from 'react-router-dom'

const containerStyles = {
  paddingY: {
    base: '2rem',
    md: '4rem',
    lg: '10rem',
  },
}

const stackStyles = {
  width: {
    base: '90%',
    md: '60%',
  },
  textAlign: 'center',
  margin: 'auto',
}

const headingStyles = {
  fontSize: { base: '1.5rem', md: '2rem', lg: '2.5rem' },
  maxW: '600px',
  margin: 'auto',
  mb: { base: '1rem', md: '2rem', lg: '3rem' },
}

export const Dashboard = () => {
  const [places, setPlaces] = useState<Place[]>([])
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await placeService.getByUserLocation({
          latitude: 23.5505,
          longitude: 46.6333,
          radius: 10,
        })
        setPlaces(response)
      } catch (err) {
        setError('Failed to fetch places')
        console.error(err)
      }
    }

    fetchPlaces()
  }, [])

  return (
    <Box sx={containerStyles}>
      <Stack sx={stackStyles}>
        <Stack>
          <Text textStyle="h1" sx={headingStyles}>
            {t('dashboard.discoverBestExercises')}
          </Text>
          <HStack
            flexDirection={{ base: 'column', md: 'row' }}
            alignContent="stretch"
            justifyContent="space-between"
            width="100%"
          >
            <LocationSelect />
            <SportSelect />
            <SearchAndFilter onSearch={console.log} />
          </HStack>
        </Stack>
        <Stack padding={'3rem'}>
          <ChooseActivity
            title={t('dashboard.lookingFor')}
            color="neutral.500"
          />
        </Stack>
        <Stack>
          <Text textStyle="h2" fontSize="2rem" alignSelf="start">
            {t('dashboard.nearYou')}
          </Text>

          {error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12}>
              {places?.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onClick={() => navigate(`/places/${place.id}`)}
                />
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
