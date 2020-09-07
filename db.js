const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "9019",
    host: "localhost",
    port: 3000,
    database: "articles",

});

module.exports = pool;