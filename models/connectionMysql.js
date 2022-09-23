const mysql = require("mysql2")

exports.con = mysql.createConnection({
    user:"root",
    password:"sirlei231",
    host:"localhost",
    database:"cantina"
})

