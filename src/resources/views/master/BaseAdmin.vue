<template lang="pug">
.wrapper(:class="{'sidebar-collapse': sidebarCollapsed, 'sidebar-closed': sidebarCollapsed && screenSmall, 'sidebar-open': !sidebarCollapsed && screenSmall}")
    nav.main-header.navbar.navbar-expand.border-bottom.bg-white
        .container-fluid
            .collapse.navbar-collapse
                ul.navbar-nav.me-auto
                    li.nav-item
                        a.nav-link(href="#" @click.prevent="toggleSidebar")
                            i.fas.fa-bars
                ul.navbar-nav
                    li.nav-item
                        a.nav-link(href="#")
                            i.fa-solid.fa-message
                    li.nav-item
                        a.nav-link(href="#")
                            i.fa-solid.fa-bell
                    li.nav-item.dropdown
                        a#menuProfile.nav-link.dropdown-toggle.profile-icon(href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false")
                            span {{ accountNameFirstLetter }}
                        ul.dropdown-menu.dropdown-menu-end(aria-labelledby="menuProfile")
                            li
                                router-link.dropdown-item(:to="{name: 'account'}")
                                    i.fas.fa-user.fa-fw.fa-sm.me-2
                                    | Account
                            .dropdown-divider
                            li
                                a.dropdown-item(@click.prevent="onLogoutClick" href="#")
                                    i.fas.fa-sign-out.fa-fw.fa-sm.me-2
                                    | Logout
    aside.main-sidebar.bg-primary
        nav.navbar.navbar-expand.py-0
            .container-fluid.flex-column
                router-link.navbar-brand.text-uppercase.fw-bolder(:to="{name: 'root'}")
                    h1 {{ appName }}
                perfect-scrollbar.collapse.navbar-collapse.w-100
                    ul.navbar-nav.flex-column.w-100
                        template(v-for="navItem in sidebarNavItems")
                            li.nav-item(:class="{dropdown: 'children' in navItem}")
                                template(v-if="'children' in navItem")
                                    a.nav-link.dropdown-toggle(href="#" :class="{'active show': '/user' === $route.path.substr(0,5)}" data-bs-toggle="dropdown" data-bs-auto-close="false")
                                        span
                                            i.fas.fa-bars.fa-fw.me-2
                                            | {{ navItem.text }}
                                    ul.dropdown-menu(:class="{'show': '/user' === $route.path.substr(0,5)}")
                                        li(v-for="child in navItem.children")
                                            router-link.dropdown-item(:to="child.to" :class="{active: $route.name === child.to.name}" @click="onSidebarNavItemClick")
                                                | {{ child.text }}
                                router-link.nav-link(v-else :to="navItem.to" :class="{active: $route.name === navItem.to.name}" @click="onSidebarNavItemClick")
                                    span
                                        i.fas.fa-bars.fa-fw.me-2
                                        | {{ navItem.text }}
    main.main-section
        .p-3
            router-view
    nav.main-footer.navbar.navbar-expand.border-top.bg-white.small.text-muted
        .container-fluid
            .collapse.navbar-collapse
                .copyright.me-auto
                    | &copy; {{ year }} {{ appName }}
                    span.d-none.d-sm-inline-block . All rights reserved.
                ul.navbar-nav
                    li.nav-item.dropup
                        a.nav-link.dropdown-toggle(href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false")
                            span {{ localeTexts[currentLocale] }}
                        ul.dropdown-menu.dropdown-menu-end.dropup
                            li(v-for="locale in supportedLocales")
                                a.dropdown-item(@click.prevent="onLocaleClick(locale)" href="#")
                                    | {{ localeTexts[locale] }}
    #sidebar-overlay(@click="toggleSidebar")
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    name: 'BaseAdmin',
    data() {
        console.log(this.$config)
        return {
            appName: this.$config.app.name,
            year: new Date().getFullYear(),

            sidebarCollapsed: false,
            screenSmall: false,

            sidebarNavItems: this.createSidebarNavItems(),

            supportedLocales: this.$config.localization.locale.supported,
            localeTexts: {
                en: 'English',
                vi: 'Tiếng Việt',
            },
        }
    },
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
        currentLocale() {
            return this.$i18n.locale
        },
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    },
    mounted() {
        window.addEventListener('resize', this.onWindowResize)
        this.onWindowResize()
    },
    methods: {
        ...mapMutations({
            accountActivateLogout: 'account/activateLogout',
        }),
        onWindowResize() {
            const old = this.screenSmall
            this.screenSmall = window.innerWidth < 992
            if ((!old && this.screenSmall && !this.sidebarCollapsed)
                || (old && !this.screenSmall && this.sidebarCollapsed)) {
                this.toggleSidebar()
                return
            }
            if (old && !this.screenSmall) {
                document.body.style.overflow = 'auto'
            }
        },
        createSidebarNavItems() {
            return [
                {
                    text: 'Dashboard',
                    to: {
                        name: 'dashboard',
                    },
                },
                {
                    text: 'User management',
                    children: [
                        {
                            text: 'List of users',
                            to: {
                                name: 'user_index',
                            },
                        },
                        {
                            text: 'Create an user',
                            to: {
                                name: 'user_create',
                            },
                        },
                    ],
                },
            ]
        },
        toggleSidebar() {
            this.sidebarCollapsed = !this.sidebarCollapsed
            document.body.style.overflow = !this.sidebarCollapsed && this.screenSmall
                ? 'hidden' : 'auto'
        },
        onSidebarNavItemClick() {
            if (this.screenSmall) {
                this.toggleSidebar()
            }
        },
        onLocaleClick(locale) {
            if (locale !== this.currentLocale) {
                this.$setLocale(locale)
            }
        },
        onLogoutClick() {
            this.accountActivateLogout()
            this.$router.push({name: 'logout'})
        },
    },
}
</script>

<style lang="scss">
.main-sidebar {
    .ps .ps__rail-y {
        &:hover, &:focus, &.ps--clicking {
            background-color: transparent;
            opacity: 0.9;
        }
    }

    .ps__rail-y {
        width: .75rem;

        &:hover, &.ps--clicking {
            > .ps__thumb-y {
                width: .5rem;
                background-color: #ffffff;
            }
        }
    }

    .ps__thumb-y {
        background-color: #ffffff;
    }
}
</style>

<style lang="scss" scoped>
$sidebar-width: 18rem;

.main-header {
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1037;
    margin-left: $sidebar-width;

    .navbar-nav .nav-link {
        padding-right: .75rem;
        padding-left: .75rem;
    }
}

.main-sidebar {
    bottom: 0;
    float: none;
    left: 0;
    position: fixed;
    top: 0;

    height: 100vh;
    z-index: 1038;

    width: $sidebar-width;

    color: white;

    .navbar {
        height: 100vh;

        > .container-fluid {
            align-items: flex-start;
            height: 100vh;
            padding: 0;
        }
    }

    .navbar-brand {
        margin: .5rem auto;

        h1 {
            font-size: 1.25rem;
            margin-bottom: 0;
            line-height: inherit;
            font-weight: inherit;
        }
    }

    .navbar-collapse {
        align-items: flex-start;
        padding: .5rem 0;
        overflow-y: auto;
    }

    a {
        color: white;
    }

    .nav-link {
        padding: .5rem 1rem;
        opacity: .9;

        &:hover {
            opacity: 1;
        }

        &.active {
            opacity: 1;
            font-weight: bold;
        }

        &.dropdown-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space: unset;

            &::after {
                border-top: .3em solid transparent;
                border-right: 0;
                border-bottom: .3em solid transparent;
                border-left: .3em solid;
            }

            &.show::after {
                border-top: .3em solid;
                border-right: .3em solid transparent;
                border-bottom: 0;
                border-left: .3em solid transparent;
            }
        }
    }

    .dropdown-menu {
        position: static;
        border: none;
        margin: 0 1rem .5rem 1rem;

        .dropdown-item {
            color: rgb(13, 110, 253);

            &:hover, &:active, &:visited, &:focus {
                background-color: rgba(13, 110, 253, .05);
            }

            &.active {
                background-color: unset;
                font-weight: bold;
            }
        }
    }
}

.main-section {
    margin-top: 57px;
    padding-bottom: 54px;

    margin-left: $sidebar-width;
}

.main-footer {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    z-index: 1032;

    margin-left: $sidebar-width;

    .copyright {
        padding-left: .5rem;
    }
}

#sidebar-overlay {
    background-color: rgba(0, 0, 0, .1);
    bottom: 0;
    display: none;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1037;
}

.sidebar-collapse {
    .main-header, .main-section, .main-footer {
        margin-left: 0;
    }

    .main-sidebar {
        margin-left: -$sidebar-width;
    }
}

.sidebar-open {
    .main-header, .main-section, .main-footer {
        margin-left: 0;
    }

    #sidebar-overlay {
        display: block;
    }
}

.profile-icon {
    padding-top: .25rem;
    padding-bottom: .25rem;

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        text-align: center;
        background-color: rgba(0, 0, 0, .05);
        color: rgba(0, 0, 0, .3);
    }

    &::after {
        display: none;
    }
}
</style>
