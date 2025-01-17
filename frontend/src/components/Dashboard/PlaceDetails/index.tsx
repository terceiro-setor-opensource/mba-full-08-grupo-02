import { FavoriteButton } from '@/components/commons/FavoriteButton'
import StarRating from '@/components/commons/StarRating'
import { UnderlinedTitle } from '@/components/commons/UnderlinedTitle'
import { Event } from '@/models/event'
import { Place } from '@/models/place'
import {
  Flex,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/layout'
import { border, Button, Image, Input } from '@chakra-ui/react'
import { color } from 'framer-motion'
import { t } from 'i18next'
import EventCard from '../EventCard'
import { TextButton } from '@/components/commons/TextButton'
import { RiArrowRightLine } from 'react-icons/ri'
import { FeedbackCard } from '../FeedbackCard'
import { OrderSelect } from '../OrderSelect'

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

const stackShareFeedbackStyle = {
  border: '1px solid #dcdcdc',
  borderRadius: '1rem',
  display: 'flex',
  flexDirection: 'row',
  padding: '1rem',
  width: '100%',
}

const sendButtonStyle = {
  bg: 'green.500',
  borderColor: 'green.200',
  borderRadius: '20px',
  color: 'neutral.100',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  paddingX: '2rem',
  width: '20%',
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

export const PlaceDetails = ({ place }: { place: Place }) => {
  return (
    <Stack sx={stackStyles}>
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={12}>
        <Image src={place?.image} alt={place?.name} sx={placeImageStyles} />
        <Stack sx={stackDetailsStyles}>
          <Flex justifyContent="space-between">
            <Text sx={titleTextStyle}>{place?.name}</Text>
            <FavoriteButton />
          </Flex>
          <Text textStyle="h3" fontSize="1.2rem" fontWeight="bold">
            {place?.place_by_activity
              ?.map((place_by_activity) => place_by_activity.activity?.name)
              .join(' - ')}
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
          <TextButton text={t('detailedLocationPage.seeMapButton')} />
        </Stack>
      </SimpleGrid>
      <Stack sx={stackOtherInfosStyle}>
        <UnderlinedTitle title={t('detailedLocationPage.description')} />
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
          {place?.events?.length > 0 ? (
            place?.events?.map((event: Event) => <EventCard event={event} />)
          ) : (
            <Text>{t('detailedLocationPage.noEventsListed')}</Text>
          )}
        </SimpleGrid>
      </Stack>
      <Stack sx={stackOtherInfosStyle}>
        <UnderlinedTitle title={t('detailedLocationPage.benefitsForHealth')} />
        <Stack>
          {place?.place_by_activity?.map((place_by_activity) => (
            <Stack>
              <Text fontWeight="bold" marginTop=".5rem">
                {place_by_activity.activity?.name}
              </Text>
              {place_by_activity.activity?.activity_benefit?.map(
                (activity_benefit) => (
                  <Text>{activity_benefit.benefit?.description}</Text>
                ),
              )}
            </Stack>
          ))}
          <TextButton text={t('detailedLocationPage.seeMoreButton')} />
        </Stack>
      </Stack>
      <Stack sx={{ ...stackOtherInfosStyle, ...stackFeedbackList }}>
        <Text sx={titleTextStyle}>
          {t('detailedLocationPage.feedbacksStackTitle')}
        </Text>
        <Stack sx={stackShareFeedbackStyle}>
          <Input
            border="none"
            placeholder={t('detailedLocationPage.feedbackInputPlaceholder')}
            width="80%"
          />
          <Button sx={sendButtonStyle}>
            <Text>{t('send')}</Text>
            <RiArrowRightLine />
          </Button>
        </Stack>
        <Stack marginTop="1rem">
          <Stack display="flex" justifyContent="space-between" flexDir="row">
            <Text sx={titleTextStyle}>
              {place?.feedback?.length || 0}{' '}
              {t(
                place?.feedback?.length > 1
                  ? 'detailedLocationPage.feedbackListTitleMultiple'
                  : 'detailedLocationPage.feedbackListTitleSingle',
              )}
            </Text>
            <OrderSelect />
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
