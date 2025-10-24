import { check } from 'express-validator';

export const movieCreateValidator = [
  check('title')
    .notEmpty()
    .withMessage('Movie title is required'),

  check('year')
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage('Valid release year is required'),

  check('genre')
    .notEmpty()
    .withMessage('Movie genre is required'),

  check('rating')
    .isFloat({ min: 0, max: 10 })
    .withMessage('Rating must be a number between 0 and 10'),

  check('thumbnail')
    .optional()
    .isURL()
    .withMessage('Thumbnail must be a valid URL'),
];

export const movieUpdateValidator = [
  check('title')
    .optional()
    .notEmpty()
    .withMessage('Movie title cannot be empty'),

  check('year')
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage('Valid release year is required'),

  check('genre')
    .optional()
    .notEmpty()
    .withMessage('Movie genre cannot be empty'),

  check('rating')
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage('Rating must be a number between 0 and 10'),

  check('thumbnail')
    .optional()
    .isURL()
    .withMessage('Thumbnail must be a valid URL'),

  check('preview')
    .optional()
    .isURL()
    .withMessage('Preview must be a valid URL'),
];

