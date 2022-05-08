import {ServiceError} from './service-error'
import {AxiosError} from 'axios'

export class StarterServiceError extends ServiceError {
    parseError() {
        if (this.error instanceof AxiosError) {
            !this.parseErrorResponse(this.error.response.data)
            && !this.parseErrorCode(this.error.code)
            && !this.parseErrorMessage(this.error.message)
        }
    }

    // eslint-disable-next-line no-unused-vars
    parseErrorResponse(data) {
        if (data?._message) {
            this.message = data._message
            this.messages = data._messages
            return true
        }
        return false
    }

    // eslint-disable-next-line no-unused-vars
    parseErrorCode(code) {
        return false
    }

    // eslint-disable-next-line no-unused-vars
    parseErrorMessage(message) {
        this.message = message
        this.messages = [message]
        return true
    }
}