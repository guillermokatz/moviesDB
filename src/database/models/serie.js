const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = "Serie";
    let cols = {
        title: DataTypes.STRING,
        release_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        genre_id: DataTypes.INTEGER
    };
    
    const Serie = sequelize.define(alias,cols);
    
    return Serie;
};