<template lang="pug">
.wrapper(:class="{'sidebar-collapse': sidebarCollapsed, 'sidebar-closed': sidebarCollapsed && screenSmall, 'sidebar-open': !sidebarCollapsed && screenSmall}")
    nav.main-header.navbar.navbar-expand.px-2.border-bottom.bg-white
        ul.navbar-nav
            li.nav-item
                a.nav-link(href="#" @click.prevent="toggleSidebar")
                    i.fas.fa-bars
            li.nav-item
                a.nav-link(href="#") Dashboard
        ul.navbar-nav.ms-auto
            li.nav-item
                a.nav-link(href="#")
                    i.fa-solid.fa-message
            li.nav-item
                a.nav-link(href="#")
                    i.fa-solid.fa-bell
    aside.main-sidebar.bg-primary
        nav.sidebar-header.navbar.navbar-expand.text-center
            a.navbar-brand.mx-auto.text-uppercase.fw-bolder(href="#")
                | {{ appName }}
        ul.nav.flex-column
            li.nav-item
                a.nav-link(href="#") Menu 1
    main.main-section
        .p-3
            router-view
    footer.main-footer.p-3.border-top.bg-white.small.text-muted
        | &copy; {{ year }} {{ appName }}
        span.d-none.d-sm-inline-block . All rights reserved.
    #sidebar-overlay(@click="toggleSidebar")
</template>

<script>
export default {
    name: 'BaseAdmin',
    data() {
        return {
            appName: this.$config.app.name,
            year: new Date().getFullYear(),

            sidebarCollapsed: false,
            screenSmall: false,
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    },
    mounted() {
        window.addEventListener('resize', this.onWindowResize)
        this.onWindowResize()
    },
    methods: {
        onWindowResize() {
            const old = this.screenSmall
            this.screenSmall = window.innerWidth < 992
            if ((!old && this.screenSmall && !this.sidebarCollapsed)
                || (old && !this.screenSmall && this.sidebarCollapsed)) {
                this.toggleSidebar()
            }
        },
        toggleSidebar() {
            this.sidebarCollapsed = !this.sidebarCollapsed
        },
    },
}
</script>

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
    overflow-y: hidden;
    z-index: 1038;

    width: $sidebar-width;

    color: white;

    a {
        color: white;
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
</style>
