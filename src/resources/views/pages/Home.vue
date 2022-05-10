<template lang="pug">
.home
    img(alt="Vue logo" src="../../assets/logo.png")
    hello-world(msg="Welcome to Your Vue.js App")
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/resources/views/components/HelloWorld.vue'
import {app} from '@/bootstrap/app'

export default {
    // eslint-disable-next-line
    name: 'Home',
    components: {
        HelloWorld,
    },
    beforeRouteEnter() { // cannot access `this`
        app.$log.info('page', 'home.beforeRouteEnter')
    },
    beforeRouteUpdate() {
        this.$log.info('page', 'home.beforeRouteUpdate')
    },
    beforeRouteLeave() {
        this.$log.info('page', 'home.beforeRouteLeave')
    },
    beforeCreate() {
        this.$log.info('page', 'home.beforeCreate')
    },
    created() {
        this.$log.info('page', 'home.created')
    },
    beforeUpdate() {
        this.$log.info('page', 'home.beforeUpdate')
    },
    updated() {
        this.$log.info('page', 'home.updated')
    },
    beforeMount() {
        this.$log.info('page', 'home.beforeMount//rendering')
    },
    mounted() {
        this.$log.info('page', 'home.mounted//rendered')
    },
    beforeUnmount() {
        this.$log.info('page', 'home.beforeUnmount')
    },
    unmounted() {
        this.$log.info('page', 'home.unmounted')
    },
}
</script>
