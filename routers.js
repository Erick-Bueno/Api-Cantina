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
router.get("/carrinho", async function(req, res){
    try {
    const dados = await carrinho.findAll()
    const resp = dados.map(function(d){
        return{
            "id": d.id,
            "Nome": d.Nome,
            "Quantidade": d.Quantidade
        }
    })
    return res.status(200).send(resp)
} catch (error) {
     return res.status(404).send(error)   
    }
    
})
//adicionar produto no carrinho
router.post("/carrinho/add", async function(req, res){
    const {Nome, Quantidade} = req.body
    try {
        const dados = await carrinho.create({
            Nome:Nome,
            Quantidade: Quantidade
        })
        const resp = {
            "Mensagem": "Produto Adicionado ao carrinho",
            "Nome": Nome,
            "Quantidade": Quantidade
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
})
//excluir produto do carrinho
router.delete("/carrinho/:id", async function(req, res){
    try {
        const id = req.params.id
        const ver = await carrinho.findByPk(id)
        if(!ver){
            return res.status(200).send("produto não encontrado")
        }
        const del = carrinho.destroy({where:{id: id}})
        const resp ={
            "mensagem": "Produto deletado do carrinho"
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(200).send(error)
    }
})

//atualizar produto do carrinho
router.put("/carrinho/:id", async function(req, res){
    try {
        const id = req.params.id
        const{Nome, Quantidade} = req.body
        const dado = carrinho.findByPk(id)
        if(!dado){
            return res.status(200).send("produto não encontrado no carrinho")
        }
        const att = carrinho.update(
            {
            Nome: Nome,
            Quantidade: Quantidade
            },
            {
                where:{
                    id:id
                }
            }
        )
        const resp = {
            "Nome": Nome,
            "Quantidade": Quantidade
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
})
module.exports = router