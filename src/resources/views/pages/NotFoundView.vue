<template lang="pug">
.not-found
    h1 404 - Not found
</template>

<script>
import {app} from '@/bootstrap/app'

export default {
    name: 'NotFoundView',
    beforeRouteEnter() { // cannot access `this`
        app.$log.info('page', 'not-found.beforeRouteEnter')
    },
    beforeRouteUpdate() {
        this.$log.info('page', 'not-found.beforeRouteUpdate')
    },
    beforeRouteLeave() {
        this.$log.info('page', 'not-found.beforeRouteLeave')
    },
    beforeCreate() {
        this.$log.info('page', 'not-found.beforeCreate')
    },
    created() {
        this.$log.info('page', 'not-found.created')
    },
    beforeUpdate() {
        this.$log.info('page', 'not-found.beforeUpdate')
    },
    updated() {
        this.$log.info('page', 'not-found.updated')
    },
    beforeMount() {
        this.$log.info('page', 'not-found.beforeMount//rendering')
    },
    mounted() {
        this.$log.info('page', 'not-found.mounted//rendered')
    },
    beforeUnmount() {
        this.$log.info('page', 'not-found.beforeUnmount')
    },
    unmounted() {
        this.$log.info('page', 'not-found.unmounted')
    },
}
</script>