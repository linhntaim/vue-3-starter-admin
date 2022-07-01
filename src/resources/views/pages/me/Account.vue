<template lang="pug">
h3.mb-3 Account
.card
    .card-body
        .text-center
            .profile-img.rounded-circle
                | {{ accountNameFirstLetter }}
            div {{ accountName }}
            div {{ accountEmail }}
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Account',
    computed: {
        ...mapGetters({
            account: 'account/account',
        }),
        accountName() {
            return this.account?.name
        },
        accountNameFirstLetter() {
            return this.accountName?.substr(0, 1).toUpperCase()
        },
        accountEmail() {
            return this.account?.email
        },
    },
}
</script>

<style lang="scss" scoped>
.profile-img {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 15rem;
        height: 15rem;
        text-align: center;
        background-color: rgba(0, 0, 0, .05);
        color: rgba(0, 0, 0, .3);
        font-size: 5rem;
        margin: 0 auto 1rem auto;
}
</style>
