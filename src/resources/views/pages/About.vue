<template lang="pug">
.about
    h1 This is an about page
    p
        small Say hello to&nbsp;
        input(v-model="world" type="text")
        small &nbsp;in&nbsp;
        select(v-model="locale")
            option(v-for="value in locales" :key="value" :value="value")
                | {{ value }}
    p {{ $t('hello', {world}) }}
</template>

<script>
import {app} from '@/bootstrap/app'

export default {
    // eslint-disable-next-line
    name: 'About',
    data() {
        return {
            world: 'World',
            locale: this.$i18n.locale,
            locales: this.$config.locale.supported,
        }
    },
    watch: {
        locale() {
            this.$setLocale(this.locale)
        },
    },
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