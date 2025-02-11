import { Image, Text } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Event } from '@/models/event'

type EventCardProps = {
  event: Event
  onClick?: () => void
}
const EventCard = ({ event, onClick }: EventCardProps) => {
  return (
    <Card onClick={onClick} height="250px">
      <CardHeader padding={0} borderTopEndRadius={4} borderTopStartRadius={4}>
        <Image
          src={event.banner}
          alt={event.name}
          objectFit="cover"
          width="100%"
          height="150"
          borderTopEndRadius={4}
          borderTopStartRadius={4}
        />
      </CardHeader>
      <CardBody textAlign={'start'} paddingBottom={0} minHeight="100px" >
          <Text
            lineHeight="short"
            color="black"
            maxWidth="100%"
            fontSize={'small'}
          >
            {event.name}
          </Text>
      </CardBody>
    </Card>
  )
}

export default EventCard
