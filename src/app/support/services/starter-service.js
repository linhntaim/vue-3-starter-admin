import {Service} from './service'
import {take} from '../helpers'
import {AxiosError} from 'axios'
import {StarterServiceError} from './starter-service-error'

/**
 * @property {AxiosInstance} request
 */
export class StarterService extends Service {
    constructor(app) {
        super(app)

        this.doneCallback = null
        this.errorCallback = null
        this.wrapErrorCallback = null
        this.alwaysCallback = null
    }

    driver() {
        return 'starter'
    }

    done(callback) {
        this.doneCallback = callback
        return this
    }

    error(callback) {
        this.errorCallback = callback
        return this
    }

    wrapError(callback) {
        this.wrapErrorCallback = callback
        return this
    }

    always(callback) {
        this.alwaysCallback = callback
        return this
    }

    responseThen(requested) {
        return requested
            .then(response => {
                if (!response.data._status) {
                    throw response
                }
                const data = response.data._data
                this.doneCallback && this.doneCallback(data)
                return data
            })
            .catch(error => {
                if (!(error instanceof AxiosError)) {
                    error = new AxiosError('Server Error', 'ERR_SERVER', error.config, error.request, error)
                }
                error = this.wrapErrorCallback ? this.wrapErrorCallback(error) : new StarterServiceError(error)
                this.errorCallback && this.errorCallback(error)
                return error
            })
            .then(response => {
                this.alwaysCallback && this.alwaysCallback(response)

                return take(response, () => {
                    this.doneCallback = null
                    this.errorCallback = null
                    this.wrapErrorCallback = null
                    this.alwaysCallback = null
                })
            })
    }

    response(requested) {
        return this.responseThen(requested)
    }

    get(url, params = {}) {
        return this.response(
            this.request.get(url, {
                params,
            }),
        )
    }
}