const Pool = require('pg').Pool

const pool = new Pool({
    user: 'ngoc',
    password: '12345678',
    host: 'localhost',
    port: 5432,
    database: 'Risen',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

module.exports = pool
