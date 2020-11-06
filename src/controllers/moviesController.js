const path = require('path');
const moment = require('moment');

const {Movie, sequelize} = require('../database/models');
const {Op} = require('sequelize');

const moviesController = {

    list: async (req, res) => {
    try {
      const moviesJson = await Movie.findAll({
        order: [['title','ASC']]
      });
      res.render('movies/list', {pelis:moviesJson, title: 'Lista de películas'})
    } catch (error) {
      console.log(error)
    }
    
    },

    rating: async (req,res) => {
      // let nroRating = req.params.id;
      try {
        let moviesJson = await Movie.findAll(
          {
          where: {rating: {[Op.gte]: 8}},
          order: [['rating','DESC']]
          })
        res.render('movies/recommended', {pelis:moviesJson, title: 'Top películas'})
      } catch (error) {
        console.log(error);
      }
    },

    detail: async (req, res) => {
      try {
        let moviesJson = await Movie.findByPk(req.params.id)
        res.render('movies/detail', {peli:moviesJson, moment:moment, title: moviesJson.title});
      } catch (error) {
        console.log(error);
      }
    },

    new: async (req,res) => {
      try {
        let moviesJson = await Movie.findAll(
          {
            order: [["release_date","DESC"]],
            limit: 5
          }
          )
        res.render('movies/new', {pelis:moviesJson, moment:moment, title: 'Últimas películas'})
      } catch (error) {
        console.log(error);
      }
    },
    
    searchResults: async (req,res) => {
      let datosBuscados = req.body;
      let ordenPor = Object.values(datosBuscados);
      let stringBuscado = ordenPor[0];
      switch (ordenPor[1]) {
          case "awards":
            ordenPor = "cantidad de premios";
            break;
          case "rating":
            ordenPor = "rating";
            break;
          case "release_date":
            ordenPor = "fecha de estreno"
            break;
          case "length":
            ordenPor = "duración"
            break;
          default:
            ordenPor = "";
          break;
      }
      
          
      if (!datosBuscados.order == "") {
          
          try {
            const moviesJson = await Movie.findAll(
              {
                where: { title: {[Op.like]: "%"+req.body.search + "%"} },
                order: [[''+datosBuscados.order+'','ASC']]
              }
            )
            // res.send(moviesJson)
            res.render('movies/search', {pelis:moviesJson, ordenPor:ordenPor, moment:moment, stringBuscado:stringBuscado, title: 'Resultados de búsqueda'})
          } catch (error) {
            console.log(error)
          }
        // res.send(datosBuscados.order)
      } else {
        try {
            const moviesJson = await Movie.findAll(
              {
                where: { title: {[Op.like]: "%"+req.body.search + "%"} },
                order: [['title','ASC']]
              }
            )
            // res.send(moviesJson)
            res.render('movies/search', {pelis:moviesJson, moment:moment, stringBuscado:stringBuscado, title: 'Resultados de búsqueda'})
          } catch (error) {
            console.log(error)
          }
        
      }
    }
        // .then((resultados) => {
        //   res.render('movies/list', {pelis:resultados})
        // })
};

module.exports = moviesController;