const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notificacoes = sequelize.define('Notificacoes', {
    Mensagem: {
        type: DataTypes.STRING,
        allowNull: false
    },
     Data: {
        type: DataTypes.DATE ,
        allowNull: false
    }

}, {
    timestamps: true


});

module.exports = Notificacoes;