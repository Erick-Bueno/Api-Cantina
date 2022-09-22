//conectando com o database
const sequelize = require("sequelize")
const Banco = new sequelize("cantina", "root", "sirlei231",{
    host:"localhost", 
    dialect: "mysql"
})

module.exports = {
    sequelize:sequelize,
    Banco:Banco
}