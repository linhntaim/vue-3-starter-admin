<template lang="pug">
main.center-main
    .center-container
        .center-header
            h1 Administration
        .center-body
            router-view
        .center-footer
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
.center-main {
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
}

.center-container {
    max-width: 24rem;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
}

.center-header {
    margin-bottom: 1.5rem;
}

.center-footer {
    margin-top: 3rem;
}
</style>
