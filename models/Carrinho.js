const con = require('./connection')

const Carrinho = con.Banco.define('carrinhos', {
    Nome:{
        type: con.sequelize.STRING
    },
    Quantidade:{
        type:con.sequelize.INTEGER
    }
})

module.exports = Carrinho

