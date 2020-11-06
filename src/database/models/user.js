const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = "User";
    let cols = {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        remember_token: DataTypes.STRING,
    };
    
    const User = sequelize.define(alias,cols);
    
    return User;
};