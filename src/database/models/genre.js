const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = "Genre";
    let cols = {
        name: DataTypes.STRING,
        ranking: DataTypes.INTEGER,
        active: DataTypes.TINYINT,
    };
    
    const Genre = sequelize.define(alias,cols);
    
    return Genre;
};