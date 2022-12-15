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
const cliente = require("./models/Cliente")
const clienteController = require("./controllers/cliente_controller")
const carrinho = require("./models/Carrinho")
const carrinhoController = require("./controllers/carrinho_controller")
const relatorioController = require("./controllers/Relatorio_controller")
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
//pesquisar produto
router.post("/produto/pesquisar", produtoController.pesqProd)

//Vendas
//venda efetuada
router.post("/venda/add", vendaController.efetuarVenda)

//teste array de produtos estoque

router.post("/vendas/est", produtoController.AddProds)

//clientes
//listar clientes
router.get("/clientes", clienteController.listarCliente )

//adicionar cliente
router.post("/clientes/add", clienteController.AdicionarCliente),
//listar unico cliente
router.get("/clientes/:id", clienteController.listarUnicoCliente)
//atualizar
router.put("/clientes/:id", clienteController.atualizarCliente)
//deletar cliente
router.delete("/clientes/:id", clienteController.deletarCliente)
//pesquisar cliente
router.post("/clientes/pesq", clienteController.pesqCliente)



//carrinho
//listar produtos no carrinho 
router.get("/carrinho", carrinhoController.listarCart )
//adicionar produto no carrinho
router.post("/carrinho/add", carrinhoController.AddProdCart)
//excluir produto do carrinho
router.delete("/carrinho/:id", carrinhoController.DelPordCart)

//atualizar produto do carrinho
router.put("/carrinho/:id", carrinhoController.attProdCart)

router.post("/encontrar", carrinhoController.encontrar)
router.delete("/deletarvenda", vendaController.deletarVend)

//relatorios
//janeiro
router.get("/janeiro", relatorioController.reljaneiro)
//fevereiro
router.get("/fevereiro", relatorioController.relfevereiro)
//março
router.get("/marco", relatorioController.relmarço)
//abril
router.get("/abril", relatorioController.relabril)
//maio 
router.get("/maio", relatorioController.relmaio)
//junho
router.get("/junho",relatorioController.reljunho)

//julho
router.get("/julho", relatorioController.reljulho)
//agosto
router.get("/agosto", relatorioController.relagosto)
//setembro
router.get("/setembro", relatorioController.relsetembro)
//outubro
router.get("/outubro", relatorioController.reloutubro)
//novembro
router.get("/novembro", relatorioController.relnovembro)
//dezembro
router.get("/dezembro", relatorioController.reldezembro)
module.exports = router