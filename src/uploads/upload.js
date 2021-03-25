const fs = require('fs')
const path = require('path')

module.exports = (caminho,nomeArquivo,callbackImagem) => {

    const tiposValidos = ['png','jpg','jpeg'];
    const tipo = path.extname(caminho)
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if(tipoEhValido){
        const novoCaminho = `/img/${nomeArquivo}${tipo}`

        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish',()=>{
            callbackImagem('false',novoCaminho)
        })
    }else{
        const erro = "Tipo é inválido"
        console.log("erro!tipo invalido");
        callbackImagemCriada(erro)
    }
}