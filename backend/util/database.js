// get the client
const mysql = require('mysql2');
const config = require('../config/config.json');

// Create the connection pool.
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password
});

module.exports = pool.promise();