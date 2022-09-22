const express = require("express")
const mysql = require("mysql2")
const router = express.Router()

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"sirlei231",
    database:"cantina"
})



module.exports = router