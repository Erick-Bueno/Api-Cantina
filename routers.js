const express = require("express")
const sequelize = require("sequelize")
const router = express.Router()
const produto = require("./models/Produto")

//adicionar produto

router.post("/produto/add", async function(req, res){
    const {Nome, Preço, Quantidade} = req.body
    try {
        const data = await produto.create({
            Nome: Nome,
            Preço: Preço,
            Quantidade: Quantidade
        })
        const response = {
            "Mensagem": "Produto adicionado",
            "Nome": Nome,
            "Preço": Preço,
            "Quantidade": Quantidade,
             Request:{
                "Tipo": "Get",
                "Descrição": "Retorno de todos os produtos cadastrados",
                "URL": "http://localhost:8040/produto"
             }
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(404).send({error})
    }
})
//listar todos os produtos

router.get("/produto", async function(req, res){
    try {
        const data = await produto.findAll()
        const dados = data.map(function(dad){
            return {
                "Mensagem" : "listagem de produtos",
                "id" : dad.id,
                "Nome": dad.Nome,
                "Preço": dad.Preço,
                "Quantidade": dad.Quantidade,
                Request:{
                    "Tipo": "GET",
                    "Descrição": "listagem de produto especifico",
                    "URL": `http://localhost:8040/produto/${dad.id}`
                }
            }
        })
        return res.status(200).send(dados) 
    } catch (error) {
        return res.status(404).send(error)
    }
    
})


module.exports = router