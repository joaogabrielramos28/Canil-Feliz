const express = require('express');

const app = express();

const handlebars = require('express-handlebars')

const bodyParser = require("body-parser");

const Cachorro = require("./models/Doguinho")

const multer = require("multer")

const path = require('path')

const {uuid} = require("uuidv4")

const uploadFolder = path.resolve(__dirname + '/uploads')

const upload = multer ({
    storage:multer.diskStorage({
        destination:uploadFolder,
        filename:(req,file,callback)=>callback(null,uuid() + path.extname(file.originalname))
    })
})


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

        app.get("/doguinhos",(req,res)=>{
            Cachorro.findAll({order:[['id','desc']]}).then((cachorros)=>{
                res.render("dogs",{cachorros:cachorros});
            })
        })
    //Post
        app.post("/registro-doguinho",upload.single('imagem'),(req,res)=>{
            console.log(req.body);
            Cachorro.create({
                nome:req.body.nome,
                idade:req.body.idade,
                telefone:req.body.telefone,
                raca:req.body.raca,
                estado:req.body.estado,
                municipio:req.body.municipio,
                imagem:req.body.imagem,
                descricao:req.body.descricao
            }).then(()=>{
                res.redirect("/")
            }).catch((erro)=>{
                res.render(erro)
            })
        })
    

//Inicializando o servidor na porta 3000
app.listen(3000,()=>{
    console.log('servidor rodando');
})