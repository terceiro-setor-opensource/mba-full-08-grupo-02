import StarRatingSelection from '@/components/commons/StarRatingSelection'
import { Stack, Text } from '@chakra-ui/layout'
import { Button, Input, Textarea } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { RiArrowRightLine } from 'react-icons/ri'
import { FcOk } from 'react-icons/fc'
import { Place } from '@/models/place'
import { Account } from '@/models/account'
import { toast } from 'react-toastify'
import FeedbackService, { feedbackService } from '@/services/feedback.service'

const stackShareFeedbackStyle = {
  border: '1px solid #dcdcdc',
  borderRadius: '1rem',
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
  margin: '0 0 0 auto',
  justifyContent: 'space-between',
  paddingX: '2rem',
  width: '150px',
}

interface Props {
  user: Account
  place: Place
}

export default function ShareFeedback({ user, place }: Props) {
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [rating, setRating] = useState(0)
  const [writtenFeedback, setWrittenFeedback] = useState('')

  async function sendFeedback() {
    if (!user || !place) {
      toast.error(t('shareFeedback.noUserOrPlaceSelected'))
      return
    }
    if (!rating) {
      toast.warning(t('shareFeedback.pleaseSelectStars'))
      return
    }
    if (!writtenFeedback || writtenFeedback.length < 10) {
      toast.warning(t('shareFeedback.pleaseFillWrittenFeedback'))
      return
    }

    const newFeedback = {
      rating,
      description: writtenFeedback,
      userid: parseInt(user.id),
      placeid: place.id,
    }

    try {
      await feedbackService.createFeedback(newFeedback)
      setFeedbackSent(true)
    } catch (err) {
      toast.error((err as Error).message || 'Failed to fetch places.')
    } finally {
      // Carregar aqui novamente os feeedbacks
    }
  }

  return (
    <>
      {feedbackSent ? (
        <Stack
          sx={{
            alignItems: 'center',
            border: '1px solid #dcdcdc',
            borderRadius: '15px',
            display: 'flex',
            padding: '1rem',
          }}
        >
          <FcOk size={'5rem'} />
          <Text
            sx={{ fontSize: '1.2rem', fontWeight: '500', textAlign: 'center' }}
          >
            {t('shareFeedback.thanksForSharing')}
          </Text>
        </Stack>
      ) : (
        <Stack sx={stackShareFeedbackStyle}>
          <Stack>
            <Text>{t('shareFeedback.howManyStars')}</Text>
            <StarRatingSelection
              rating={rating}
              setRating={setRating}
              count={5}
              size={20}
            />
          </Stack>
          <Stack>
            <Text>{t('shareFeedback.feedbackInputPlaceholder')}</Text>
            <Textarea
              value={writtenFeedback}
              onChange={(e) => setWrittenFeedback(e.currentTarget.value)}
            />
          </Stack>
          <Button sx={sendButtonStyle} onClick={() => sendFeedback()}>
            <Text>{t('send')}</Text>
            <RiArrowRightLine />
          </Button>
        </Stack>
      )}
    </>
  )
}
