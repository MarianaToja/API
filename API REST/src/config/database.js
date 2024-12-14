const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('restapi', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, 

    define: {
        timestamps: true, // Adiciona automaticamente createdAt e updatedAt em tabelas
        underscored: true 
    }
});

module.exports = sequelize;
