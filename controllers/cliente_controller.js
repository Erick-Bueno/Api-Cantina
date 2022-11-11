const cliente = require('../models/Cliente')
const conection_mysql = require("../models/connectionMysql")
exports.listarCliente = async function(req, res){
    try {
    const dados = await cliente.findAll()
    const resp = dados.map(function(d){
        return {
            
            "id": d.id,
            "Nome": d.Nome,
            "Numero":d.Telefone,

        }
        
    })
    return res.status(200).send(resp)
    } catch (error) {
        return res.status(400).send(error)
    }
    

}
exports.AdicionarCliente = async function(req, res){
    const {Nome, Telefone} = req.body
    try {
        const add = await cliente.create({
            Nome: Nome,
            Telefone: Telefone
        })
        const resp = {
            "Mensagem": "Cliente Adicionado com sucesso",
            "Nome" : Nome,
            "Telefone": Telefone,
            request:{
                "Tipo": "GET",
                "Descrição":"Listagem de todos os clientes",
                "URL":"http://localhost:8040/clientes"
            }
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
}

exports.listarUnicoCliente = async function(req, res){
    const id = req.params.id
    try {
        const reg = await cliente.findByPk(id)
        
        if(!reg){
            return res.status(404).send("cliente não encontrado")
        }
        const resp = 
    
             {
                "Mensagem": "listagem de unico cliente",
                "Id": reg.id,
                "Nome": reg.Nome,
                "Telefone": reg.Telefone,
                request:{
                    "Tipo":"GET",
                    "Descrição": "Listar todos os usuarios",
                    "URL": "http://localhost:8040/clientes"
                }
                
            }
        
        return res.status(200).send(resp)
    
    } catch (error) {
        return res.status(400).send(error)
    }
}

exports.atualizarCliente =  async function(req, res){
    const{Nome, Telefone} = req.body
    const id = req.params.id
    try {
        const reg = await cliente.findByPk(id)
        if(!reg){
            return res.status(404).send("cliente não encontrado")
        }
        const att = await cliente.update({
            Nome: Nome,
            Telefone: Telefone
        },
        {
            where:{
                id: id
            }
        }
        )
        const resp = {
            "Mensagem": "Cliente Atualizado Com Sucesso",
            "Nome": Nome,
            "Telefone": Telefone,
            request:{
                "Tipo": "GET",
                "Descrição": "Listagem de unico Cliente",
                "URL": `http://localhost:8040/clientes/${id}`
            }
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(400).send(error)
    }
   
    
}
exports.deletarCliente = async function(req, res){
    const id = req.params.id
    try {
        const reg = await cliente.findByPk(id)
        if(!reg){
            return res.status(400).send("cliente não encontrado")
        }
        const del = await cliente.destroy({where:{id:id}})
        const resp = {
            "Mensagem": "Cliente deletado com sucesso",
            request:{
                "tipo": "GET",
                "descrição": "Listagem de unico cliente",
                "URL": `http://localhost:8040/clientes/${id}`
            }
        }
        return res.status(200).send(resp)
    } catch (error) {
        
    }
}

exports.pesqCliente = async function(req, res){
    const{pesqCliente} = req.body
    function pesquisar_cli(){
        return new Promise((resolve, reject) => {
            conection_mysql.con.query(`select id, Nome, Telefone from clientes where Nome like '%${pesqCliente}%' `, function( error, results){
                if(error){
                    return reject(error)
                }return resolve(results)
            })
        })
    }
    try {
        const peq = await pesquisar_cli()
        if(peq.length == 0){
            return res.status(200).send("nenhum cliente encontrado")
        }
        const resp = peq.map(function(c){
            return{
                "id": c.id,
                "Nome": c.Nome,
                "Telefone": c.Telefone
            }
        })
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
}