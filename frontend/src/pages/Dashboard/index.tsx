import { useEffect, useState } from 'react'
import { t } from 'i18next'
import { Box, HStack, SimpleGrid, Stack, Text, Button } from '@chakra-ui/react'
import { ChooseActivity } from '@/components/Home/ChooseActivity'
import { SportSelect } from '@/components/Dashboard/SportSelect'
import { LocationSelect } from '@/components/Dashboard/LocationSelect'
import PlaceCard from '@/components/Dashboard/PlaceCard'
import { placeService } from '@/services/place.service'
import { Place } from '@/models/place'
import { useNavigate } from 'react-router-dom'
import { activityService } from '@/services/activity.service'
import { SearchBar } from '@/components/commons/SearchBar'
import { containerStyles, headingStyles, stackStyles } from './styles'
import { BiSearch } from 'react-icons/bi'

export const Dashboard = () => {
  const navigate = useNavigate()

  const [activities, setActivities] = useState<
    { text: string; value: number }[]
  >([])
  const [stateSearchByCity, setStateSearchByCity] = useState('')
  const [stateSearchBySportId, setStateSearchBySportId] = useState<number>()
  const [stateSearchQuery, setStateSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [places, setPlaces] = useState<Place[]>([])

  const fetchActivities = async () => {
    try {
      const response = await activityService.getActivities()
      setActivities(
        (response || []).map((option) => ({
          text: option.name,
          value: option.id,
        })),
      )
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch activities.')
    }
  }

  useEffect(() => {
    fetchActivities()
    const response = placeService.getByUserLocation()
    response.then((places) => {
      setPlaces(places)
    })
  }, [])

  function handleSearch() {
    navigate(
      `/places?name=${stateSearchQuery}&city=${stateSearchByCity}&sport=${stateSearchBySportId}`,
    )
  }

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
            <LocationSelect
              onChange={(e) => setStateSearchByCity(e.currentTarget.value)}
            />

            <SportSelect
              onChange={(e) =>
                setStateSearchBySportId(parseInt(e.currentTarget.value))
              }
              options={activities}
            />

            <HStack width="100%">
              <SearchBar
                placeholder={t('dashboard.searchPlace')}
                onSearch={(query) => setStateSearchQuery(query)}
                variant="filled"
              />
            </HStack>

            <Button onClick={handleSearch} colorScheme="purple">
              <BiSearch />
            </Button>
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
              {places && places.map((place) => ( 
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
