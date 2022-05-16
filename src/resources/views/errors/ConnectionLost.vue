<template lang="pug">
.internal-server-error
    h1 503 - Service Unavailable
    p Connection to server has been lost.
    button(type="button" @click="onRefreshClick") Refresh
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    name: 'ConnectionLost',
    methods: {
        ...mapMutations({
            pingReset: 'ping/reset',
        }),
        onRefreshClick() {
            this.pingReset()
            this.$router.push({name: 'root'})
        },
    },
}
</script>