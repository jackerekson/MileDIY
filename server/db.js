const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Chevy_1500",
    host: "localhost",
    port: 5432,
    database: "milediy"
})

module.exports = pool