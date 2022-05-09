import {Maker} from '../maker'

export class Service extends Maker {
    constructor(app) {
        super(app)

        this.request = this.app.config.globalProperties.$request.driver(this.driver())
    }

    driver() {
        return null
    }

    response(requested) {
        return requested
    }
}