<template lang="pug">
.about
    h1 This is an about page
</template>

<script>
import {app} from '@/bootstrap/app'

export default {
    name: 'AboutView',
    beforeRouteEnter() { // cannot access `this`
        app.$log.info('page', 'about.beforeRouteEnter')
    },
    beforeRouteUpdate() {
        this.$log.info('page', 'about.beforeRouteUpdate')
    },
    beforeRouteLeave() {
        this.$log.info('page', 'about.beforeRouteLeave')
    },
    beforeCreate() {
        this.$log.info('page', 'about.beforeCreate')
    },
    created() {
        this.$log.info('page', 'about.created')
    },
    beforeUpdate() {
        this.$log.info('page', 'about.beforeUpdate')
    },
    updated() {
        this.$log.info('page', 'about.updated')
    },
    beforeMount() {
        this.$log.info('page', 'about.beforeMount//rendering')
    },
    mounted() {
        this.$log.info('page', 'about.mounted//rendered')
    },
    beforeUnmount() {
        this.$log.info('page', 'about.beforeUnmount')
    },
    unmounted() {
        this.$log.info('page', 'about.unmounted')
    },
}
</script>