<template lang="pug">
main
    .auth-container
        .auth-header
            h1 Administration
        .auth-body
            router-view
        .auth-footer
            .text-muted &copy; {{ year }} {{ appName }}
</template>

<script>
export default {
    name: 'BaseAuth',
    data() {
        return {
            appName: this.$config.app.name,
            year: new Date().getFullYear(),
        }
    },
}
</script>

<style lang="scss" scoped>
main {
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
}

.auth-container {
    max-width: 24rem;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
}

.auth-header {
    margin-bottom: 1.5rem;
}

.auth-footer {
    margin-top: 3rem;
}
</style>
