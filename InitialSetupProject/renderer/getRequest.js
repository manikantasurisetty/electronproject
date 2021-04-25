const https = require('https')
const options = {
    hostname: 'whatever.com',
    port: 443,
    path: '/todos',
    method: 'GET'
}
exports.data = [];
const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        exports.data = d;
    })
})

req.on('error', error => {
    console.error(error)
})

req.end()
