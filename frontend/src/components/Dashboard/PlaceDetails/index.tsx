import { FavoriteButton } from '@/components/commons/FavoriteButton'
import StarRating from '@/components/commons/StarRating'
import { UnderlinedTitle } from '@/components/commons/UnderlinedTitle'
import { Place } from '@/models/place'
import { Flex, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import { Button, Image } from '@chakra-ui/react'
import { color } from 'framer-motion'
import { t } from 'i18next'

const stackStyles = {
  width: {
    base: '100%',
    md: '100%',
  },
  textAlign: 'left',
  margin: 'auto',
}

const stackDetailsStyles = {
  padding: {
    base: 'none',
    lg: '1.5rem',
  },
  width: {
    base: '80%',
    md: '100%',
  },
  textAlign: 'left',
  margin: 'auto',
}

const placeImageStyles = {
  rounded: 'md',
  width: {
    base: '80%',
    md: '100%',
  },
  margin: 'auto',
}

const seeMapButtonStyle = {
  bg: 'green.500',
  borderColor: 'green.200',
  borderRadius: '20px',
  color: 'neutral.100',
  cursor: 'pointer',
  paddingX: 20,
}

export const PlaceDetails = ({ place }: { place: Place }) => {
  return (
    <Stack sx={stackStyles}>
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={12}>
        <Image src={place?.image} alt={place?.name} sx={placeImageStyles} />
        <Stack sx={stackDetailsStyles}>
          <Flex justifyContent="space-between">
            <Text textStyle="h2" fontSize="1.7rem" fontWeight="bold">
              {place?.name}
            </Text>
            <FavoriteButton />
          </Flex>
          <Text textStyle="h3" fontSize="1.2rem" fontWeight="bold">
            {['Cilismo', 'Hipismo', 'Futebol'].join(' - ')}
          </Text>
          <Text color="#ababab">
            {place?.address?.streetname} - {place?.address?.neighborhood},{' '}
            {place?.address?.city} - {place?.address?.state},{' '}
            {place?.address?.postalcode}
          </Text>
          <StarRating
            rating={place?.rating_avg || 0}
            reviewCount={place?.feedback?.length}
          />
          <Button sx={seeMapButtonStyle}>
            {t('detailedLocationPage.seeMapButton')}
          </Button>
        </Stack>
      </SimpleGrid>
      <Stack>
        <UnderlinedTitle title={t('detailedLocationPage.description')} />
        <Text>{place?.description}</Text>
      </Stack>
    </Stack>
  )
}
