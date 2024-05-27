require('dotenv').config();
var sql = require('mssql/msnodesqlv8');

//cac thong tin cua co so du lieu
var config = {
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    driver: process.env.DB_DRIVER,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};


// const pool = new sql.ConnectionPool(config);
const pool = new sql.ConnectionPool(config);

module.exports = {
    pool
};