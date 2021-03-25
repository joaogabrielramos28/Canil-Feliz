const Sequelize = require("sequelize")
const sequelize = new Sequelize('canil-feliz','root','admin',{
    host:'localhost',
    dialect:'mysql'
})


module.exports = {
    sequelize : sequelize,
    Sequelize : Sequelize
}