const { Pool } = require("pg");
require("dotenv").config();

const getCon = () => {
    const pool = new Pool()
    return pool
}

module.exports = {
    getCon
}