<template lang="pug">
main.center-main
    .center-container
        .center-header
            h1 Administration
        .center-body
            h4.fw-light.text-nowrap.text-danger Clear site data
            p.mt-4 Including session storage, local storage and cookies.
            button.btn.btn-danger(type="button" @click="onClearClick") Clear
            pre.mt-3(v-if="logs.length")
                code {{ lines }}
        .center-footer
            .text-muted &copy; {{ year }} {{ appName }}
</template>

<script>
export default {
    name: 'ClearSiteData',
    data() {
        return {
            logs: [],

            appName: this.$config.app.name,
            year: new Date().getFullYear(),
        }
    },
    computed: {
        lines() {
            return this.logs.join('\n')
        },
    },
    methods: {
        onClearClick() {
            this.logs = []
            this.$nextTick(() => {
                this.clearSessionStorage()
                this.clearLocalStorage()
                this.clearCookies()
            })
        },
        clearSessionStorage() {
            this.logs.push('Clearing session storage ...')
            window.sessionStorage.clear()
            this.logs.push('Session storage was cleared.')
        },
        clearLocalStorage() {
            this.logs.push('Clearing local storage ...')
            window.localStorage.clear()
            this.logs.push('Local storage was cleared.')
        },
        clearCookies() {
            this.logs.push('Clearing cookies ...')
            document.cookie.split(';').forEach(function (cookie) {
                document.cookie = cookie.replace(/^ +/, '')
                    .replace(/=.*/, '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/')
            })
            this.logs.push('Cookies were cleared.')
        },
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
