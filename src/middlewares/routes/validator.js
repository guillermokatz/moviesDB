const { body, validationResult } = require('express-validator');
module.exports = {
    createMovie: [
        body('title')
            .notEmpty()
            .withMessage('La película debe tener un título')
            .bail()
            .isLength({max: 500})
            .withMessage('El título no puede tener más de 500 caracteres'),
        body('rating')
            .notEmpty()
            .withMessage('La película debe tener un rating')
            .bail()
            .isFloat({min:1, max: 10})
            .withMessage('El rating sólo puede ser del 1 al 10. Puede contener decimales, por ejemplo 8.3'),
        body('awards')
            .notEmpty()
            .withMessage('La película debe tener un número de premios')
            .bail()
            .isInt({max:9999999999})
            .withMessage('La cantidad de premios ingresado no es válido.'),
        body('release_date')
            .notEmpty()
            .withMessage('La película debe tener una fecha de estreno'),
        body('length')
            .notEmpty()
            .withMessage('La película debe tener una duración')
            .bail()
            .isInt({max:9999999999})
            .withMessage('La duración ingresada no es válida'),
        body('genre_id')
            .notEmpty()
            .withMessage('La película debe tener un género'),
    ],

    createActor: [
        body('first_name')
            .notEmpty()
            .withMessage('El actor o actriz deben tener un primer nombre')
            .bail()
            .isLength({max: 100})
            .withMessage('El nombre no puede tener más de 100 caracteres'),
        body('last_name')
            .notEmpty()
            .withMessage('El actor o actriz deben tener un apellido')
            .bail()
            .isLength({max: 100})
            .withMessage('El apellido no puede tener más de 100 caracteres'),
        body('rating')
            .notEmpty()
            .withMessage('El actor o actriz deben tener un rating')
            .bail()
            .isFloat({min:1, max: 10})
            .withMessage('El rating sólo puede ser del 1 al 10. Puede contener decimales, por ejemplo 8.3'),
    ]

};