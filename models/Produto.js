
const conexao = require("./connection")

const Produto = conexao.Banco.define("produtos",{
    Nome:{
        type: conexao.sequelize.STRING
    },
    Preço:{
        type: conexao.sequelize.DECIMAL(6,3)
    },
    Quantidade:{
        type: conexao.sequelize.INTEGER
    }
})

module.exports = Produto
