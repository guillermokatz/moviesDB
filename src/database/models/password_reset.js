const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = "Password_Reset";
    let cols = {
        email: DataTypes.STRING,
        token: DataTypes.STRING
    };

    let config = {
        tableName: "password_resets"
    }
    
    const Password_Reset = sequelize.define(alias,cols,config);
    
    return Password_Reset;
};