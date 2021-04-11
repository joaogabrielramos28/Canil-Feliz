const express = require('express');
require('dotenv').config()
const app = express();

const handlebars = require('express-handlebars')

const bodyParser = require("body-parser");

const Cachorro = require("./models/Doguinho")
const path = require('path')
const aws = require("aws-sdk");
const multer = require('multer');
const multerS3 = require('multer-s3');
const { uuid } = require('uuidv4');
aws.config.update({
    accessKeyId:`${process.env.AWS_ACCESS_KEY}`,
    secretAccessKey:`${process.env.AWS_SECRET_KEY}`,
    region:`${process.env.AWS_REGION}`,
    
})
const s3 = new aws.S3();

const upload = multer({
    storage:multerS3({
        s3,
        bucket:`${process.env.AWS_BUCKET}`,
        acl:'public-read',
        key(req,file,callback){
            callback(null,uuid() + path.extname(file.originalname))
        }

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

        app.get("/*",(req,res)=>{
            res.render("404")
        })
    //Post
        app.post("/registro-doguinho",upload.single('imagem'),(req,res)=>{
            console.log(req);
            Cachorro.create({
                nome:req.body.nome,
                idade:req.body.idade,
                telefone:req.body.telefone,
                raca:req.body.raca,
                estado:req.body.estado,
                municipio:req.body.municipio,
                imagem:"https://canil-images.s3-sa-east-1.amazonaws.com/"+req.file.key,
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