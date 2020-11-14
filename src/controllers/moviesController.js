const path = require('path');
const moment = require('moment');
const { validationResult } = require('express-validator');
const {Movie, Genre, sequelize} = require('../database/models');
const {Op} = require('sequelize');

const moviesController = {

    list: async (req, res) => {
    try {
      const moviesJson = await Movie.findAll({ include:["Genre"],
          order: [['title','ASC']]
        }
        );
      // res.send(moviesJson);
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
        let moviesJson = await Movie.findByPk(req.params.id, {
          include:{all:true}
        })
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
    },

    create: async (req, res) => {
      
      

      try {
        const generos = await Genre.findAll({
          order: [['name','ASC']]
        });
        res.render('movies/create_movie', {title: 'Crear película', generos});

      } catch (error) {
        console.log(error)
      }
    },

    processCreate: async (req, res) => {
      const errors = validationResult(req);
      
      const generos = await Genre.findAll({
        order: [['name','ASC']]
      });

      if (errors.isEmpty()) {     
        try {
          await Movie.create(req.body);
          res.redirect('/movies');
        } catch (error) {
          console.log(error)
        }      
      }
      else {
        const old = req.body;
        res.render('movies/create_movie', {title: 'Crear película', generos: generos, errors: errors, old: old});
      }
    },

    edit: async (req, res) => {
      try {
        const movie = await Movie.findByPk(req.params.id, {
          include:['Genre']
        });

        const generos = await Genre.findAll({
          order: [['name','ASC']]
        });

        res.render('movies/edit_movie', {movie: movie, generos: generos, moment:moment, title: "Editar " + movie.title});

      } catch (error) {
        console.log(error)
      }
    },

    processEdit: async (req, res) => {
      const errors = validationResult(req);
      
      const movie = await Movie.findByPk(req.params.id, {
        include:['Genre']
      });

      const generos = await Genre.findAll({
        order: [['name','ASC']]
      });
      
      if (errors.isEmpty()) {
        try {
        await Movie.update(req.body, {
          where: {id: req.params.id}
        });
        res.redirect('../../movies/');

        } catch (error) {
          console.log(error)
        };
      } else {
        const old = req.body;
        res.render('movies/edit_movie', {movie: movie, generos: generos, moment:moment, title: "Editar " + movie.title, errors: errors, old: old});
      }
    },

    delete: async (req, res) => {
      try {
      const movie = await Movie.findByPk(req.params.id, {include:{all: true}});
      await movie.removeActores(movie.actores)
      // res.send(movie)
      
      await Movie.destroy({
        where: {id: req.params.id}
      });

      res.redirect('/movies');

      } catch (error) {
        console.log(error);
      }
    },

    genreDetail: async (req,res) => {
      try {
        let genero = await Genre.findByPk(req.params.id, {
          include:{all:true}
        })
        res.render('movies/genreDetail', {genero, title: genero.title});
      } catch (error) {
        console.log(error);
      }
    }
        // .then((resultados) => {
        //   res.render('movies/list', {pelis:resultados})
        // })
};

module.exports = moviesController;