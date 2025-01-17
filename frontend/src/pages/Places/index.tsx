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
import { debounce } from 'lodash' // Optional, for debouncing

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
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [searchParams] = useSearchParams()

  const sportQuery = searchParams.get('q')
  const [nameSearch, setNameSearch] = useState<string | null>(null)

  const handleSearch = useCallback(
    debounce((search: string) => {
      setNameSearch(search)
    }, 300),
    [],
  )

  const fetchPlaces = async () => {
    setLoading(true)
    try {
      const response = await placeService.getPlaces({
        filter: {
          order: '',
          order_by: '',
          searchByCity: "",
          searchByNameDescription: '',
          searchBySportId: undefined,
        },
      })
      setPlaces(response)
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch places.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlaces()
  }, [sportQuery, nameSearch])

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
            <LocationSelect />
            <SportSelect />
            <SearchAndFilter onSearch={handleSearch} />
          </HStack>
        </Stack>
        <Stack spacing={8} paddingTop={12} alignItems={'start'}>
          <Text textStyle="h2" fontSize="1.2rem">
            {t('locationsPage.searchResults')}
          </Text>

          {loading ? (
            <Text>{t('loading')}</Text>
          ) : error ? (
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
