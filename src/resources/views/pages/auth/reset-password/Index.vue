<template lang="pug">
.reset-password
    h1 Reset Password
    form(@submit.prevent="onSubmit")
        div
            input(v-model="password" type="password" name="password" placeholder="Password" required)
        template(v-if="error.validation.password")
            div(v-for="message in error.validation.password")
                small {{ message }}
        div
            input(v-model="passwordConfirmation" type="password" name="password_confirmation" placeholder="Password Confirmation" required)
        button(:disabled="loading._" type="submit") Submit
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {StarterServiceError} from '@/app/support/services'

export default {
    // eslint-disable-next-line
    name: 'Index',
    data() {
        return {
            loading: {
                _: false,
            },

            error: {
                messages: [],
                validation: {},
            },
        }
    },
    computed: {
        ...mapGetters({
            resetPasswordProgressing: 'resetPassword/progressing',
        }),
        token: {
            get() {
                return this.$store.state.resetPassword.token
            },
            set(value) {
                this.$store.state.resetPassword.token = value
            },
        },
        email: {
            get() {
                return this.$store.state.resetPassword.email
            },
            set(value) {
                this.$store.state.resetPassword.email = value
            },
        },
        password: {
            get() {
                return this.$store.state.resetPassword.password
            },
            set(value) {
                this.$store.state.resetPassword.password = value
            },
        },
        passwordConfirmation: {
            get() {
                return this.$store.state.resetPassword.passwordConfirmation
            },
            set(value) {
                this.$store.state.resetPassword.passwordConfirmation = value
            },
        },
    },
    created() {
        if (!this.resetPasswordProgressing) {
            this.resetPasswordReset()
        }

        this.token = this.$route.params.token
        if ('email' in this.$route.query) {
            this.email = this.$route.query.email
        }
    },
    methods: {
        ...mapActions({
            resetPassword: 'resetPassword/resetPassword',
        }),
        ...mapMutations({
            resetPasswordSetProgressing: 'resetPassword/setProgressing',
            resetPasswordReset: 'resetPassword/reset',
        }),
        onSubmit() {
            this.loading._ = true
            this.resetPassword().then(data => {
                this.loading._ = false
                if (data instanceof StarterServiceError) {
                    this.error.messages = data.messages
                    if (data.data && 'validation' in data.data) {
                        this.error.validation = data.data.validation
                    }
                }
                else {
                    this.resetPasswordSetProgressing(true)
                    this.$router.push({name: 'password.reset.success'})
                }
            })
        },
    },
}
</script>
