<template lang="pug">
.register
    h1 Login
    form(@submit.prevent="onSubmit")
        div
            input(v-model="email" type="email" name="email" placeholder="Email" required)
        div
            input(v-model="password" type="password" name="password" placeholder="Password" required)
        button(:disabled="loading._" type="submit") Submit
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Login',
    data() {
        return {
            loading: {
                _: false,
            },

            email: '',
            password: '',
        }
    },
    computed: {
        ...mapGetters({
            accountIsLoggedIn: 'account/isLoggedIn',
        }),
    },
    methods: {
        ...mapActions({
            accountLogin: 'account/sanctumLogin',
        }),
        onSubmit() {
            this.loading._ = true
            this.accountLogin({
                email: this.email,
                password: this.password,
            }).then(data => {
                this.loading._ = false
                if (this.accountIsLoggedIn) {
                    this.$router.push({name: 'root'})
                }
                else {
                    console.log(data)
                }
            })
        },
    },
}
</script>

<style scoped lang="sass">

</style>
