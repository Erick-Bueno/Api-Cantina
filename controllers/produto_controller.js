const produto = require("../models/Produto")
const sequelize = require("sequelize")

exports.listarProdutos = async function(req, res){
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
    
}

exports.adicionarProduto = async function(req, res){
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
}

exports.listarProdutoEspecifico = async function(req, res){
    const id = req.params.id
    try {
        const dados = await produto.findByPk(id)
        if(!dados){
            return res.status(404).send("produto não encontrado")
        }

        const response =
            {
                "Mensagem": "retorno de produto especifico",
                "id": dados.id,
                "Nome": dados.Nome,
                "Preço": dados.Preço,
                "Quantidade": dados.Quantidade,
                Request:{
                    "Tipo": "GET",
                    "Descrição": "Listagem de todos os produtos",
                    "URL": "http://localhost:8040/produto"
                    
                    
                    
                }
    
            }

        return res.status(200).send(response)
        
        
    } catch (error) {
        return res.status(404).send(error)
    }
   
}

exports.deletarProduto = async function(req, res){
    const id = req.params.id
    try {
        const dados_deletados = await produto.destroy({where:{id: id}})
        if(!dados_deletados){
            return res.status(404).send("id não encontrado")
        }
        const response = {
            "mensagem": "produto deletado",
            Request:{
                "Tipo": "GET",
                "Descrição": "Listagem de todos os produtos",
                "URL": "http://localhost:8040/produto"
            }
        }
        return res.status(202).send(response)
    } catch (error) {
        return res.status(404).send(error)
    }
   
}

exports.atualizarProduto =  async function(req, res){
    const id = req.params.id
    const {Nome, Preço, Quantidade} = req.body
    const dados = await produto.findByPk(id)
    if(!dados){
        return res.status(404).send("produto não encontrado")
    }
    try {
        const dados = await produto.update(
            {
                Nome: Nome,
                Preço: Preço,
                Quantidade: Quantidade
            },
            {
                where:{
                    id: id
                }
            }
            
        )
        const response = {
            "mensagem": "produto atualizado",
            "id":id,
            "Nome": Nome,
            "Preço": Quantidade,
            Request:{
                "Tipo": "Get",
                "Descrição": "Retorno de produto especifico",
                "URL": `http://localhost:8040/produto/${id}`
            }
        }
        return res.status(202).send(response)
    } catch (error) {
        
    }
   
     
}