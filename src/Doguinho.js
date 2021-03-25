const conexao = require('./conexao')

const Cachorro = conexao.sequelize.define('cachorros',{
    imagem:{
        type:conexao.Sequelize.STRING
    },
    nome:{
        type:conexao.Sequelize.STRING
    },
    idade:{
        type:conexao.Sequelize.STRING
    },
    raça:{
        type:conexao.Sequelize.STRING
    },
    descricao:{
        type:conexao.Sequelize.TEXT
    },
    estado:{
        type:conexao.Sequelize.STRING
    },
    municipio:{
        type:conexao.Sequelize.STRING
    }


})
//Criando banco de dados
//Cachorro.sync({force:true})
