<template lang="pug">
.login
    h4.mb-3.fw-normal Please sign in
    form(@submit.prevent="onSubmit")
        .alert.alert-danger.text-start(v-if="formErrorValidation.email")
            template(v-for="message in formErrorValidation.email")
                | {{ message }}
                br
        .form-floating
            input#inputEmail.form-control(v-model="email" type="email" name="email" placeholder="Email" required)
            label(for="inputEmail") Email address
        .form-floating
            input#inputPassword.form-control(v-model="password" type="password" name="password" placeholder="Password" autocomplete="off" required)
            label(for="inputPassword") Password
        button.btn.btn-primary.btn-lg.w-100(:disabled="loading._" type="submit") Sign in
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

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
            formErrorMessages: 'formError/messages',
            formErrorValidation: 'formError/validation',
        }),
    },
    methods: {
        ...mapMutations({
            formErrorReset: 'formError/reset',
            formErrorSetMessages: 'formError/setMessages',
            formErrorSetValidation: 'formError/setValidation',
        }),
        ...mapActions({
            accountLogin: 'account/sanctumLogin',
        }),
        onSubmit() {
            this.loading._ = true
            this.formErrorReset()
            this.accountLogin({
                email: this.email,
                password: this.password,
            }).then(() => {
                this.loading._ = false
                if (this.accountIsLoggedIn) {
                    this.$router.push(this.$config.app.routes.redirect_after_authenticated)
                }
            }).catch(err => {
                this.loading._ = false
                this.formErrorSetMessages(err.messages)
                if (err.data && 'validation' in err.data) {
                    this.formErrorSetValidation(err.data.validation)
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
input[type='email'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

input[type='password'] {
    margin-bottom: 1rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
