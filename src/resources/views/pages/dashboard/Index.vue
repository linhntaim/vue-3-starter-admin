<template lang="pug">
h3.mb-3 Dashboard
.card
    .card-body
        | {{ $t('hello', {world: accountName}) }},
        br
        br
        | {{ $t('welcome') }}.
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Index',
    computed: {
        ...mapGetters({
            account: 'account/account',
        }),
        accountName() {
            return this.account?.name
        },
    },
}
</script>
