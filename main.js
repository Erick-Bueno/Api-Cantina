const express = require("express")
const cors = require("cors")
const body = require("body-parser")
const ex = express()
const router = require("./routers")



ex.use(cors())
ex.use(body.urlencoded({extended:false}))
ex.use(body.json())
ex.use(router)

ex.listen("8040", function(){
    console.log("servidor ligado..")
})
