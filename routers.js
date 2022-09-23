const express = require("express")
const sequelize = require("sequelize")
const router = express.Router()
const produto = require("./models/Produto")
const produtoController = require("./controllers/produto_controller")
const mysql = require("mysql2")
const conection_mysql = require("./models/connectionMysql")
const { response } = require("express")
const vendaController = require("./controllers/venda_controller")
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

module.exports = router