const fs = require('fs')

if (!fs.existsSync('./.env')) {
    fs.copyFileSync('./.env.example', './.env')
}

const publicVendorPath = './public/vendor'
const vendors = {
    './node_modules/bootstrap/dist': `${publicVendorPath}/bootstrap/dist`,
    './node_modules/bootstrap-icons/font': `${publicVendorPath}/bootstrap-icons/font`,
    './node_modules/bootstrap-icons/icons': `${publicVendorPath}/bootstrap-icons/icons`,
    './node_modules/@fortawesome/fontawesome-free/css': `${publicVendorPath}/fontawesome-free/css`,
    './node_modules/@fortawesome/fontawesome-free/webfonts': `${publicVendorPath}/fontawesome-free/webfonts`,
}
Object.keys(vendors).forEach(source => {
    const destination = vendors[source]
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, {recursive: true})
    }
    fs.cpSync(source, destination, {recursive: true})
})
