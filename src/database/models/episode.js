const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let alias = "Episode";
    let cols = {
        title: DataTypes.STRING,
        number: DataTypes.INTEGER,
        release_date: DataTypes.DATE,
        rating: DataTypes.DECIMAL,
        season_id: DataTypes.INTEGER
    };
    let config = {
        // timestamps: false
    };

    const Episode = sequelize.define(alias,cols);
    
    return Episode;
};