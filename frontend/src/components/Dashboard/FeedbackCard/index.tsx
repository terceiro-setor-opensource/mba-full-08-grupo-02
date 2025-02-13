import StarRating from '@/components/commons/StarRating'
import { Feedback } from '@/models/feedback'
import {
  Avatar,
  Card,
  CardBody,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'

interface FeedbackCardProps {
  feedback: Feedback
}

export const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  return (
    <Card>
      <CardBody>
        <HStack gap="3">
          <Avatar
            src={`${feedback.users?.profile_image  || "https://images.unsplash.com/photo-1511806754518-53bada35f930"}`}
            name={`${feedback?.users?.name}`}
          />
          <Stack gap="0">
            <HStack gap="3">
              <Text fontWeight="semibold" textStyle="sm">
                {feedback?.users?.name}
              </Text>
              <StarRating rating={feedback?.rating} />
            </HStack>
            <Text color="fg.muted" textStyle="sm">
              {feedback?.description}
            </Text>
            <Stack alignItems="center" display="flex" flexDir="row">
              {/* <Text color="gray.500" textStyle="sm" fontSize=".8rem">
                we don't have this info yet
              </Text> */}
              {/* <Button
                variant="plain"
                width="fit-content"
                height="fit-content"
                fontSize=".8rem"
              >
                {t('like')}
              </Button> */}
            </Stack>
          </Stack>
        </HStack>
      </CardBody>
    </Card>
  )
}
