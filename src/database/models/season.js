const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = "Season";
    let cols = {
        title: DataTypes.STRING,
        number: DataTypes.INTEGER,
        release_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        serie_id: DataTypes.INTEGER
    };
    
    const Season = sequelize.define(alias,cols);
    
    return Season;
};