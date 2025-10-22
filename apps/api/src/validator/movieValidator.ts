import expressValidator from 'express-validator';

export const movieValidator = [
  expressValidator
    .check('movieName')
    .notEmpty()
    .withMessage('Move Name is required'),
  expressValidator
    .check('Movie star')
    .notEmpty()
    .withMessage('movie star is required'),
];
