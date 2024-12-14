const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Conta = sequelize.define('Conta', {
    saldo: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }

}, {
    timestamps: true


});

module.exports = Conta;