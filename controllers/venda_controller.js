const conection_mysql = require("../models/connectionMysql")

exports.efetuarVenda = async function(req, res){
    const {idProduto, quantVend, MeioPag} = req.body
    function verificar_estoque(){
        return new Promise((resolve, reject) => {
            conection_mysql.con.query(`select quantidade from produtos where id = ${idProduto}`, function(error, results){
                if(error){
                    return reject(error)

                }return resolve(results)
            })
        })
    }
    
    function realizarvenda(){
        return new Promise((resolve, reject) => {
            conection_mysql.con.query(`insert into vendas(idProduto, quantVend, MeioPag) values(${idProduto}, ${quantVend}, '${MeioPag}')`, function(error, result){
                if (error){
                    return reject(error)
                }return resolve(result)
            })
        })
    }
    
    try {
        const estoque = await verificar_estoque()
        if(estoque[0].quantidade ==0 ||estoque[0].quantidade == null ){
            return res.status(200).send("sem estoque do produto")
        }
        const controle_estoque = estoque[0].quantidade - quantVend
        if(controle_estoque < 0){
            return res.status(202).send(`quantidade solicitada maior que a que possuimos no estoque, atualmente possuimos em estoque ${estoque[0].quantidade} desse produto`)
        }
        function atualizar_estoque(){
            return new Promise((resolve, reject) => {
               conection_mysql.con.query(`update produtos set quantidade = ${controle_estoque} where id = ${idProduto}`, function(error, results){
                    if(error){
                        return reject (error)
                    }return resolve(results)
                })
            })
        }
        console.log(estoque[0].quantidade)
        const dados = await realizarvenda()
        const response = {
            "Mensagem": "Venda efetuada",
            "Id_produto": idProduto,
            "Quantidade_vendida": quantVend,
            "Meio_de_pagamaento": MeioPag,
            Request:{
                "Tipo": "Get",
                "Descrição":"Listagem de todas as vendas",
                "URL": "http://localhost:8040/venda"
            }
        }
        const new_quant = await atualizar_estoque()
        return res.status(202).send(response)
    } catch (error) {
        return res.status(404).send("produto não encontrado no estoque")
    }
}