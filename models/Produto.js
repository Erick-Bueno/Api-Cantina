
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
    },
    Peso:{
        type: conexao.sequelize.DECIMAL(6,3)
    },
    UniMedida:{
        type: conexao.sequelize.STRING
    },
    Categoria:{
        type: conexao.sequelize.STRING
    },
    Preço_Compra_total:{
        type: conexao.sequelize.DECIMAL(6,3)
    },
    Preço_Compra_Unitario:{
        type: conexao.sequelize.DECIMAL(6,3)
    }

})


module.exports = Produto
