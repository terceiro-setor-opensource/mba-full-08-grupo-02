import { useCallback, useEffect, useState } from 'react'
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
import { activityService } from '@/services/activity.service'
import { debounce } from 'lodash'

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
  const navigate = useNavigate()

  const [places, setPlaces] = useState<Place[]>([])
  const [activities, setActivities] = useState<
    { text: string; value: number }[]
  >([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const [stateOrder, setStateOrder] = useState('')
  const [stateOrderBy, setStateOrderBy] = useState('')
  const [stateSearchByCity, setStateSearchByCity] = useState('')
  const [stateSelectedActivityName, setStateSelectedActivityName] = useState('')
  const [stateSearchByNameDescription, setSearchStateByNameDescription] =
    useState('')
  const [stateSearchBySportId, setStateSearchBySportId] = useState<
    number | undefined
  >(undefined)

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
          searchByCity: stateSearchByCity,
          searchByNameDescription: stateSearchByNameDescription,
          searchBySportId: stateSearchBySportId,
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
        <Stack padding={'3rem'}>
          <ChooseActivity
            title={t('dashboard.lookingFor')}
            color="neutral.500"
            setStateSearchBySportId={setStateSearchBySportId}
            setStateSelectedActivityName={setStateSelectedActivityName}
          />
        </Stack>
        <Stack>
          <Text textStyle="h2" fontSize="2rem" alignSelf="start">
            {stateSelectedActivityName ? `${stateSelectedActivityName} ` : ''}
            {t('dashboard.nearYou')}
          </Text>

          {error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12}>
              {(places || []).map((place) => (
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
