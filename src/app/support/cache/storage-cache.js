import {Cache} from './cache'

export class StorageCache extends Cache
{
    constructor(storage) {
        super()

        this.storage = storage
    }
}