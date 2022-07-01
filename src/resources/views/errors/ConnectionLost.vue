<template lang="pug">
.internal-server-error
    h4.fw-light.text-nowrap.text-danger 503 - Service Unavailable
    p.mt-4 Connection to server has been lost.
    button.btn.btn-primary(type="button" @click="onRefreshClick") Refresh
</template>

<script>
export default {
    name: 'ConnectionLost',
    methods: {
        onRefreshClick() {
            this.$router.push({name: 'root'})
        },
    },
}
</script>
