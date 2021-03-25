const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser")
//Config
    //Body-Parser
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended:false}))
    //Template Engine
        app.engine('handlebars',handlebars({defaultLayout:'main'}))
        app.set('view engine','handlebars')



//Rotas
    //Get
        app.get("/",(req,res)=>{
            res.render('home')
        })


//Inicializando o servidor na porta 3000
app.listen(3000,()=>{
    console.log('servidor rodando');
})