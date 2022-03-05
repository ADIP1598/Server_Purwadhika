const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mantan123',
    database: 'dbshutter',
    port: 3307,
    multipleStatements: true
})

db.connect((err) => {
    if (err) {
        return console.error(`error: ${err.message}`)
    }
    console.log(`Connected to MySQL Server`)
})

module.exports = { db }