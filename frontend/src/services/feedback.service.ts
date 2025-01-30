import { Feedback } from '@/models/feedback'
import api from './api'

class FeedbackService {
  private basePath = '/feedbacks' // Base path for Feedback

  public async createFeedback(feedback: Feedback) {
    try {
      const response = await api.post(this.basePath, feedback)
      return response.data
    } catch (error: any) {
      this.handleError(error)
    }
  }

  private handleError(error: any): never {
    if (error.response) {
      throw new Error(error.response.data?.message || error.response.statusText)
    } else if (error.request) {
      throw new Error('No response from server')
    } else {
      throw new Error(error.message)
    }
  }
}


export const feedbackService = new FeedbackService()
