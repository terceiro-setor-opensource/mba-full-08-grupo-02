import { Feedback } from '@/models/feedback'
import { Place } from '@/models/place'
import { feedbackService } from '@/services/feedback.service'
import theme from '@/theme'
import { HStack } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/react'
import { t } from 'i18next'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { toast } from 'react-toastify'

const responsiveWidth = {
  base: '100%',
  md: 'auto',
}

interface Props {
  place: Place
  setFeedbackList: Dispatch<SetStateAction<Feedback[]>>
}
export const OrderSelect = ({ place, setFeedbackList }: Props) => {
  async function fetchFeedbacksByOrder(e: ChangeEvent<HTMLSelectElement>) {
    const { value } = e.currentTarget
    const [orderBy, order] = (value || 'id.ASC').split('.')

    try {
      const response = await feedbackService.findFeebaacksByPlace(
        place.id,
        orderBy,
        order,
      )
      setFeedbackList(response)
    } catch (err) {
      toast.error((err as Error).message || 'Failed to fetch places.')
    }
  }

  return (
    <Select
      width="fit-content"
      placeholder={t('orderSelection.select')}
      size="md"
      onChange={fetchFeedbacksByOrder}
    >
      <option value="id.DESC">{t('orderSelection.newer')}</option>
      <option value="id.ASC">{t('orderSelection.older')}</option>
      <option value="rating.DESC">{t('orderSelection.higher')}</option>
      <option value="rating.ASC">{t('orderSelection.lower')}</option>
    </Select>
  )
}
