import {Drivers} from '../drivers'
import {StarterEncryptor} from './starter-encryptor'

export class Encryption extends Drivers
{
    getDefaultDriver() {
        return this.config?.get('encryption.default', 'starter')
    }

    createDefaultDriver() {
        return new StarterEncryptor(this.app)
    }
}