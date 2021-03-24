const express = require('express');
const app = express();
const bodyParser = require("body-parser")
//Configurando body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


//Inicializando o servidor na porta 3000
app.listen(3000,()=>{
    console.log('servidor rodando');
})