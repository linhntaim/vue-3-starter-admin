<template lang="pug">
.unauthenticated
    h4.fw-light.text-nowrap.text-danger 401 - Unauthenticated
    p.mt-4
        router-link.btn.btn-primary(:to="loginRoute") Go to Login
</template>

<script>
export default {
    // eslint-disable-next-line
    name: 'Unauthenticated',
    data() {
        return {
            loginRoute: this.$config.app.routes.login,
        }
    },
}
</script>
