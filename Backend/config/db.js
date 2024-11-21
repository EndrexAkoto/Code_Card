const fs = require('fs')
const path = require('path')

// Path to the CA certificate file
const caCert = fs.readFileSync(path.join(__dirname, '..', 'config', 'ca.pem'))

const mysql = require('mysql2')

// Create a connection pool
const pool = mysql.createPool({
    host: 'mysql-e996962-martinakoto25-c196.h.aivencloud.com', // Aiven host
    user: 'avnadmin',                                          // Aiven username
    password: 'AVNS_tqc2aN_Nm80tkeAR7NP',                      // Aiven password
    database: 'defaultdb',                                     // Aiven default database
    port: 11637,                                               // Aiven port
    ssl: {
        ca: caCert,                                             // Use the CA certificate for SSL
        rejectUnauthorized: true                                // Ensure SSL is used and verified
    }
})

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database: ', err)
        return
    }
    console.log('Connected to the database')
    connection.release() // Release the connection back to the pool
})

// Export the pool to be used in other files
module.exports = pool
