const express = require("express")
const sequelize = require("sequelize")
const router = express.Router()
const produto = require("./models/Produto")
const produtoController = require("./controllers/produto_controller")
const mysql = require("mysql2")
const conection_mysql = require("./models/connectionMysql")
const { response } = require("express")
const vendaController = require("./controllers/venda_controller")
const nodemon = require("nodemon")
//PRODUTOS
//adicionar produto
router.post("/produto/add", produtoController.adicionarProduto)
//listar todos os produtos
router.get("/produto", produtoController.listarProdutos)
//listar produto especifico
router.get("/produto/:id", produtoController.listarProdutoEspecifico)
//deletar produto
router.delete("/produto/:id", produtoController.deletarProduto)
//atualizar produto
router.put("/produto/:id",produtoController.atualizarProduto)

//Vendas
//venda efetuada
router.post("/venda/add", vendaController.efetuarVenda)

//teste array de produtos estoque

router.post("/vendas/est", async function(req, res){

    const produtoss = req.body
    let vendas = []
    let lucrototal = 0
    let preço_item = 0
    codigo_venda = `${Math.round(Math.random()*10)}${Math.round(Math.random()*10)}${Math.round(Math.random()*10)}${Math.round(Math.random()*10)}`

    for(let i = 0; i < produtoss.produtos.length; i = i + 1){
        function verificar_estoque(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select * from produtos where id = ${produtoss.produtos[i].idProduto}`, function(error, results){
                    if(error){
                        return reject(error)
    
                    }return resolve(results)
                })
            })
        }let dado = await verificar_estoque()  
        if(dado.length == 0){
           return res.status(400).send("produto inexistente")
        }  
        let controle_estoque = dado[0].Quantidade - produtoss.produtos[i].quantidade
        function atualizar_estoque(){
            return new Promise((resolve, reject) => {
               conection_mysql.con.query(`update produtos set Quantidade = ${controle_estoque} where id = ${produtoss.produtos[i].idProduto}`, function(error, results){
                    if(error){
                        return reject (error)
                    }return resolve(results)
                })
            })
        }
        const att = await atualizar_estoque()
        preço_item = dado[0].Preço *produtoss.produtos[i].quantidade
        lucrototal = lucrototal + preço_item
        
        function lucro_item(){
               return new Promise((resolve, reject) => {
                conection_mysql.con.query(`insert into financeiroo (nome, lucro_porItem) values ('${dado[0].Nome}', '${preço_item}')`, function(error, results){
                        if(error){
                            return reject(error)
                        }return resolve(results)
                    })
                
                 
               }) 
             
            }     
               
            
           const dudu = await lucro_item() 
           function lucro_venda(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`insert into financeirooo(lucro_porVenda) values (${lucrototal}) `, function(error, results){
                    if (error){
                        return reject(error)
                    }return resolve(results)
                })
            })
           
         }
         function adicionar_venda(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`insert into venda(id_produto, nome, Preço, quantidade, lucro_do_produto, lucrototal, Codigo_da_venda) values(${produtoss.produtos[i].idProduto}, '${dado[0].Nome}', ${dado[0].Preço}, ${ produtoss.produtos[i].quantidade}, ${preço_item}, ${lucrototal}, ${codigo_venda})`, function(error, results){
                    if (error){
                        return reject(error)
                    }return resolve(results)
                })
            })
         }
        let add_venda = await adicionar_venda()
        let dadus = await lucro_venda()
      
        let lista = {
            "vendas":{

            }
        }
      
           
            lista.vendas = {
                "mensagem" : "item vendido",
                "id_produto": produtoss.produtos[i].idProduto,
                "nome": dado[0].Nome,
                "Preço":dado[0].Preço,
                "quantidade": produtoss.produtos[i].quantidade,
                "lucro_do_produto": preço_item
                
            }
            vendas.unshift(lista.vendas)
             
           
    
            
          
        }    
        return res.send({
        vendas,
        "lucrototal": lucrototal}) 
   
})

module.exports = router