const carrinho = require("../models/Carrinho")
const conection_mysql = require("../models/connectionMysql")
exports.listarCart = async function(req, res){
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
    
}
exports.AddProdCart = async function(req, res){
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
}

exports.DelPordCart = async function(req, res){
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
}

exports.attProdCart = async function(req, res){
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
}

exports.encontrar = async function(req, res){
    const {nome} = req.body
    try {
        async function encontrar_id(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select id from produtos where Nome = '${nome}'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }const dado = await encontrar_id()
        const resp = {
            "id" : dado[0].id
        }
        res.status(200).send(resp)
    } catch (error) {
        return res.status(400).send(error)
    }
   
}