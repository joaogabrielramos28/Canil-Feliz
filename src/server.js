const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser");
const { static } = require('express');
//Config
    //Body-Parser
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended:false}))
    //Template Engine
        app.engine('handlebars',handlebars({defaultLayout:'main'}))
        app.set('view engine','handlebars')

    //Static
        app.use(express.static('public'))

//Rotas
    //Get
        app.get("/",(req,res)=>{
            res.render('home')
        })

        app.get("/registro-doguinho",(req,res)=>{
            res.render('registro')
        })
    

//Inicializando o servidor na porta 3000
app.listen(3000,()=>{
    console.log('servidor rodando');
})