export const storage = {
    default: 'local',
    drivers: {
        local: {
            flatten: true,
        },
        cookie: {
            flatten: true,
            // encrypt: true,
        },
    },
}