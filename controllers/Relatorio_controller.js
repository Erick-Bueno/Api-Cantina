const conection_mysql = require("../models/connectionMysql")
exports.reljaneiro = async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-01%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-01%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   
   
}

exports.relfevereiro =  async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-02%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-02%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   
   
}
exports.relmarço =  async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-03%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-03%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   
   
}

exports.relabril =  async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-04%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-04%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   
   
}

exports.relmaio= async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-05%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-05%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   
   
}

exports.reljunho =  async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-06%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-06%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   
}
exports.reljulho = async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-07%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-07%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   
   
}

exports.relagosto = async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-08%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-08%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   
   
}
exports.relsetembro=async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-09%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-09%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   
}
exports.reloutubro = async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-10%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-10%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   
}
exports.relnovembro = async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-11%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-11%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   

 }

 exports.reldezembro = async function(req, res){
    const {ano} = req.body
    try {
        async function Vendasjan(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select quantidade, Preço, data_venda, nome, lucro_do_produto from venda where data_venda like '%${ano}-12%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
            
        }
        async function receita(){
            return new Promise((resolve, reject) => {
                conection_mysql.con.query(`select sum(lucro_do_produto) from venda where data_venda like'%${ano}-12%'`, function(error, results){
                    if(error){
                        return reject(error)
                    }return resolve(results)
                })
            })
        }
        const dados = await Vendasjan()
        const receitas = await receita()
        const resp = {
            "dados": dados,
            'receita': receitas[0]['sum(lucro_do_produto)']
        }
        return res.status(200).send(resp)
    } catch (error) {
        return res.status(404).send(error)
    }
   
   
}