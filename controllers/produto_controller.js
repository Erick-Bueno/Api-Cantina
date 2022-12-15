const produto = require("../models/Produto")
const sequelize = require("sequelize")
const mysql = require("mysql2")
const conection_mysql = require("../models/connectionMysql")

exports.listarProdutos = async function(req, res){
    try {
        const data = await produto.findAll()
        const dados = data.map(function(dad){
            return {
                "id": dad.id,
                "Nome": dad.Nome,
                "Preço": dad.Preço,
                "Quantidade": dad.Quantidade,
                "Peso": dad.Peso,
                "UniMedida": dad.UniMedida,
                "Categoria": dad.Categoria,
                "Data": dad.createdAt,
                "Preço_Compra_total": dad.Preço_Compra_total,
                "Preço_Compra_Unitario":dad.Preço_Compra_Unitario
            }
        })
        return res.status(200).send(dados) 
    } catch (error) {
        return res.status(404).send(error)
    }
    
}

exports.adicionarProduto = async function(req, res){
    const {Nome, Preço, Quantidade, Peso,UniMedida, Categoria,Preço_Compra_total,Preço_Compra_Unitario} = req.body
    
   

    function existe_porod(){
        return new Promise((resolve, reject) => {
            conection_mysql.con.query(`select Quantidade from produtos where Nome = '${Nome}' and Peso = ${Peso} and Categoria = '${Categoria}' and UniMedida = '${UniMedida}'`, function(error, results){
                if(error){
                    return reject(error)
                }return resolve(results)
            })
        })
    }

    
    const exist = await existe_porod()
    
    
    
        if(exist.length > 0){
        Nova_quant = exist[0].Quantidade + Quantidade
     
        
        function somar_quant(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`update produtos set Quantidade = ${Nova_quant} where Nome = '${Nome}' and Peso = ${Peso} and Categoria = '${Categoria}' and UniMedida = '${UniMedida}'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const sum = await somar_quant()
        return res.status(202).send(`produdo adicionado nova quantidade ${Nova_quant}`)
        }
      
    
    try {

        
       
        const data = await produto.create({
            Nome: Nome,
            Preço: Preço,
            Quantidade: Quantidade,
            Peso: Peso,
            UniMedida: UniMedida,
            Categoria: Categoria,
            Preço_Compra_total:Preço_Compra_total,
            Preço_Compra_Unitario: Preço_Compra_Unitario
        })
        const response = {
            "Mensagem": "Produto adicionado",
            "Nome": Nome,
            "Preço": Preço,
            "Peso": Peso,
            "UniMedida":UniMedida,
            "Quantidade": Quantidade,
            "Preço_Compra_total":Preço_Compra_total,
            "Preço_Compra_Unitario": Preço_Compra_Unitario,
        
             Request:{
                "Tipo": "Get",
                "Descrição": "Retorno de todos os produtos cadastrados",
                "URL": "http://localhost:8040/produto"
             }
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(404).send(error)
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
                "Peso": dados.Peso,
                "UniMedida": dados.UniMedida,
                "Categoria": dados.Categoria,
                "Preço_Compra_total": dados.Preço_Compra_total,
                "Preço_Compra_Unitario":dados.Preço_Compra_Unitario,
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
    const {Nome, Preço, Quantidade, Peso, UniMedida, Categoria,Preço_Compra_total,Preço_Compra_Unitario} = req.body
    const dados = await produto.findByPk(id)
    if(!dados){
        return res.status(404).send("produto não encontrado")
    }
    try {
        const dados = await produto.update(
            {
                Nome: Nome,
                Preço: Preço,
                Quantidade: Quantidade,
                Peso: Peso,
                UniMedida: UniMedida,
                Categoria: Categoria,
                Preço_Compra_total:Preço_Compra_total,
                Preço_Compra_Unitario:Preço_Compra_Unitario
            
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
            "Peso": Peso,
            "UniMedida": UniMedida,
            "Categoria": Categoria,
            "Preço_Compra_total": Preço_Compra_total,
            "Preço_Compra_Unitario":Preço_Compra_Unitario,
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
exports.AddProds =  async function(req, res){

    const produtoss = req.body
    console.log(produtoss)
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
                conection_mysql.con.query(`insert into venda(id_produto, nome, Preço, quantidade, lucro_do_produto, lucrototal, Codigo_da_venda, data_venda) values(${produtoss.produtos[i].idProduto}, '${dado[0].Nome}', ${dado[0].Preço}, ${ produtoss.produtos[i].quantidade}, ${preço_item}, ${lucrototal}, ${codigo_venda}, now())`, function(error, results){
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
   
}
exports.pesqProd =  async function(req, res){
    const {campo_pesquisa} = req.body
    
    function pesquisa(){
        return new Promise((resolve, reject) => {
            conection_mysql.con.query(`select id, Nome, Preço, Quantidade, Peso, UniMedida, Categoria, createdAt,Preço_Compra_total,Preço_Compra_Unitario from produtos where Nome like '%${campo_pesquisa}%' `, function(error, results){
                if(error){
                    return reject(error)
                }return resolve(results)
                 
            })
        })
    }
    try {
        const dados = await pesquisa() 
        if(dados.length <= 0){
            return res.status(401).send("produto não encontrado")
        }
        const response = dados.map(function(dad){
            return{
                "id": dad.id,
                "Nome": dad.Nome,
                "Preço": dad.Preço,
                "Quantidade": dad.Quantidade,
                "Peso": dad.Peso,
                "UniMedida": dad.UniMedida,
                "Categoria": dad.Categoria,
                "Data": dad.createdAt,
                "Preço_Compra_total": dad.Preço_Compra_total,
                "Preço_Compra_Unitario":dad.Preço_Compra_Unitario
            }
            
        })
        return res.status(202).send(response)
    } catch (error) {
        return res.status(500).send(error)
    }
    
   
    
}