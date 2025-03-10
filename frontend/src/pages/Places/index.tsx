import { useEffect, useState, useCallback } from 'react'
import { t } from 'i18next'
import { Box, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import { SportSelect } from '@/components/Dashboard/SportSelect'
import { SearchAndFilter } from '@/components/Dashboard/SearchAndFilter'
import { LocationSelect } from '@/components/Dashboard/LocationSelect'
import PlaceCard from '@/components/Dashboard/PlaceCard'
import { placeService } from '@/services/place.service'
import { Place } from '@/models/place'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash' 
import { activityService } from '@/services/activity.service'
import LoadingPlaceSkeleton from '@/components/Dashboard/LoadingPlaceSkeleton'

const stackStyles = {
  width: {
    base: '90%',
    md: '60%',
  },
  textAlign: 'center',
  margin: 'auto',
}

export const Places = () => {
  const navigate = useNavigate()

  const [places, setPlaces] = useState<Place[]>([])
  const [activities, setActivities] = useState<
    { text: string; value: number }[]
  >([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)


  const initialValues = new URLSearchParams(useSearchParams().toString())
  const initialCity = initialValues.get('city') || ''
  const initialSport = initialValues.get('sport') || ''
  const initialSearch = initialValues.get('name') || ''


  const [stateOrder, setStateOrder] = useState('')
  const [stateOrderBy, setStateOrderBy] = useState('')
  const [stateSearchByCity, setStateSearchByCity] = useState(initialCity)
  const [stateSelectedActivityName, setStateSelectedActivityName] = useState('')
  const [stateSearchByNameDescription, setSearchStateByNameDescription] =
    useState(initialSearch)
  const [stateSearchBySportId, setStateSearchBySportId] = useState<
    number | undefined
  >(initialSport ? parseInt(initialSport) : undefined)

  const handleSearch = useCallback(
    debounce((search: string) => {
      setSearchStateByNameDescription(search)
    }, 300),
    [],
  )

  const fetchPlaces = async () => {
    setLoading(true)
    try {
      const response = await placeService.getPlaces({
        filter: {
          order: stateOrder,
          order_by: stateOrderBy,
          city: stateSearchByCity,
          name: stateSearchByNameDescription,
          sport: stateSearchBySportId,
        },
      })
      setPlaces(response)
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch places.')
    } finally {
      setLoading(false)
    }
  }
  const fetchActivities = async () => {
    try {
      const response = await activityService.getActivities()
      setActivities(
        (response || []).map((option) => {
          return { text: option.name, value: option.id }
        }),
      )
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch activities.')
    }
  }

  useEffect(() => {
    fetchPlaces()
  }, [
    stateOrder,
    stateOrderBy,
    stateSearchByCity,
    stateSearchByNameDescription,
    stateSearchBySportId,
  ])

  useEffect(() => {
    fetchActivities()
  }, [])

  return (
    <Box paddingY={'2rem'}>
      <Stack sx={stackStyles}>
        <Stack>
          <HStack
            flexDirection={{ base: 'column', md: 'row' }}
            alignContent="stretch"
            justifyContent="space-between"
            width="100%"
          >
            <LocationSelect
              defaultValue={stateSearchByCity}
              onChange={(e) => setStateSearchByCity(e.currentTarget.value)}
            />

            <SportSelect
              value={stateSearchBySportId}
              onChange={(e) => {
                setStateSearchBySportId(
                  e.currentTarget.value
                    ? parseInt(e.currentTarget.value)
                    : undefined,
                )
                setStateSelectedActivityName(
                  e.currentTarget.options[e.currentTarget.selectedIndex]
                    .innerText,
                )
              }}
              options={activities}
            />
            <SearchAndFilter
              defaultValue={stateSearchByNameDescription}
              onSearch={handleSearch}
              sortChange={(e) => {
                if (e.currentTarget.value) {
                  setStateOrder(e.currentTarget.value.split('/')[1])
                  setStateOrderBy(e.currentTarget.value.split('/')[0])
                } else {
                  setStateOrder('')
                  setStateOrderBy('')
                }
              }}
            />
          </HStack>
        </Stack>
        <Stack spacing={8} paddingTop={12} alignItems={'start'}>
          <Text textStyle="h2" fontSize="1.2rem">
            {t('locationsPage.searchResults')}
            {stateSelectedActivityName
              ? ` ${t(
                  'locationsPage.searchResultsFor',
                )} ${stateSelectedActivityName}:`
              : ''}
          </Text>

          {loading ? (
            <LoadingPlaceSkeleton />
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12}>
              {places.length === 0 && (
                <Text>{t('locationsPage.noResults')}</Text>
              )}  
              {places.length > 0 && places.map((place) => (
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
