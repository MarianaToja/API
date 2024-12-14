const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transacao  = sequelize.define('Transacao', {
    TipoDeconta: {
        type: DataTypes.STRING,
        allowNull: false
    },

    TipoDeTransacao: {
        type: DataTypes.ENUM(
            "Corrente",
            "Poupança",
            "Salário",
            "Mista",
            "Digital",
            "Universitária",
            "Conjunta",
            "Solidária"
        ),
        allowNull: false,
        unique: true
    },

    Valor: {
        type: DataTypes.DECIMAL (10,2),
        allowNull: false,
        unique: true 
    }, 

   DataDaTransacao: { 
    type: DataTypes.DATE,
    allowNull: false,
    unique: true 
}

}, {
    timestamps: true


});

module.exports = Transacao;