const conS = require("./connection")



const Cliente = conS.Banco.define("clientes",{
    Nome:{
        type: conS.sequelize.STRING
    },
    Telefone:{
        type: conS.sequelize.STRING
    }

})

module.exports = Cliente