import { FavoriteButton } from '@/components/commons/FavoriteButton'
import StarRating from '@/components/commons/StarRating'
import { UnderlinedTitle } from '@/components/commons/UnderlinedTitle'
import { Event } from '@/models/event'
import { Place } from '@/models/place'
import {
  Badge,
  Flex,
  HStack,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout'
import { Button, Image, Input, useDisclosure } from '@chakra-ui/react'
import { t } from 'i18next'
import EventCard from '../EventCard'
import { TextButton } from '@/components/commons/TextButton'
import { RiArrowRightLine } from 'react-icons/ri'
import { FeedbackCard } from '../FeedbackCard'
import { OrderSelect } from '../OrderSelect'
import { useNavigate } from 'react-router-dom'
import { MapModal } from './MapModal'
import ShareFeedback from '../ShareFeedback'
import { useAuth } from '@/hooks/useAuth'
import { useCallback } from 'react'
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

const stackOtherInfosStyle = {
  marginTop: '2rem',
}

const titleTextStyle = {
  textStyle: 'h2',
  fontSize: '1.7rem',
  fontWeight: 'bold',
}

const stackFeedbackList = {
  margin: '2rem auto auto auto',
  width: {
    base: '100%',
    md: '80%',
  },
}

const loginRedirectButtonStyle = {
  bg: 'green.500',
  borderColor: 'green.200',
  borderRadius: '20px',
  color: 'neutral.100',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  paddingX: '2rem',
}

export const PlaceDetails = ({ place }: { place: Place }) => {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  return (
    <Stack sx={stackStyles}>
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={12}>
        <Image src={place?.image} alt={place?.name} sx={placeImageStyles} />
        <Stack
          sx={stackDetailsStyles}
          justifyContent={'space-between'}
          height={'100%'}
        >
          <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
            <Flex justifyContent="space-between" width={'100%'}>
              <Text sx={titleTextStyle}>{place?.name}</Text>
              <FavoriteButton />
            </Flex>
            <HStack wrap={'wrap'} spacing={2}>
              {place.place_by_activity?.map((place_by_activity) => (
                <Badge>{place_by_activity.activity?.name}</Badge>
              ))}
            </HStack>
            <Text color="#ababab">
              {place?.address?.streetname} - {place?.address?.neighborhood},{' '}
              {place?.address?.city} - {place?.address?.state},{' '}
              {place?.address?.postalcode}
            </Text>
            <StarRating
              rating={place?.rating_avg || 0}
              reviewCount={place?.feedback?.length}
            />
          </VStack>
          <TextButton
            text={t('detailedLocationPage.seeMapButton')}
            onClick={onOpen}
          />
        </Stack>
      </SimpleGrid>

      <MapModal
        isOpen={isOpen}
        onClose={onClose}
        latitude={place?.address?.latitude}
        longitude={place?.address?.longitude}
        placeName={place?.name}
      />
      <Stack sx={stackOtherInfosStyle}>
        <Text>{place?.description}</Text>
      </Stack>
      <Stack sx={stackOtherInfosStyle}>
        <Flex justifyContent="space-between">
          <UnderlinedTitle title={t('detailedLocationPage.locationEvents')} />
          <TextButton
            text={t('detailedLocationPage.addEvent')}
            backgroundColor="#AC46F0"
          />
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12}>
          {place?.events && place?.events?.length > 0 ? (
            place?.events?.map((event: Event) => <EventCard event={event} />)
          ) : (
            <Text>{t('detailedLocationPage.noEventsListed')}</Text>
          )}
        </SimpleGrid>
      </Stack>
      <Stack sx={stackOtherInfosStyle}>
        <UnderlinedTitle title={t('detailedLocationPage.benefitsForHealth')} />
        <Stack>
          {place?.place_by_activity && place.place_by_activity.length > 0 ? (
            <>
              <Stack>
                <Text fontWeight="bold" marginTop=".5rem">
                  {place.place_by_activity[0].activity?.name}
                </Text>
                {place.place_by_activity[0].activity?.activity_benefit?.map(
                  (activity_benefit) => (
                    <Text key={activity_benefit.benefit?.description}>
                      {activity_benefit.benefit?.description}
                    </Text>
                  ),
                )}
              </Stack>
              <TextButton
                text={t('detailedLocationPage.seeMoreButton')}
                onClick={() => navigate(`/places/${place.id}/benefits`)}
              />
            </>
          ) : (
            <Text>{t('detailedLocationPage.noBenefitsListed')}</Text>
          )}
        </Stack>
      </Stack>
      <Stack sx={{ ...stackOtherInfosStyle, ...stackFeedbackList }}>
        <Text sx={titleTextStyle}>
          {t('detailedLocationPage.feedbacksStackTitle')}
        </Text>
        {!user ? (
          <Button
            sx={loginRedirectButtonStyle}
            onClick={() => navigate('/login')}
          >
            <Text>{t('detailedLocationPage.loginRedirect')}</Text>
          </Button>
        ) : (
          <ShareFeedback user={user} place={place} />
        )}

        <Stack marginTop="1rem">
          <Stack display="flex" justifyContent="space-between" flexDir="row">
            <Text sx={titleTextStyle}>
              {place?.feedback?.length || ''}{' '}
              {t(
                place?.feedback?.length > 1
                  ? 'detailedLocationPage.feedbackListTitleMultiple'
                  : place?.feedback?.length === 1
                  ? 'detailedLocationPage.feedbackListTitleSingle'
                  : 'detailedLocationPage.noFeedbackListTitle',
              )}
            </Text>
            {place?.feedback?.length > 1 ? <OrderSelect /> : <></>}
          </Stack>
          <List>
            {place?.feedback?.map((feedback) => {
              return (
                <ListItem marginBottom="1rem">
                  <FeedbackCard feedback={feedback} />{' '}
                </ListItem>
              )
            })}
          </List>
        </Stack>
      </Stack>
    </Stack>
  )
}
