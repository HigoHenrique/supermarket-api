import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';

export const isValidUuid = (value: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
};

export const validate = (req: Request, res: Response, next: NextFunction): void | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateCreateProduct = [
  body('name')
    .notEmpty().withMessage('O nome do produto é obrigatório')
    .isString().withMessage('O nome deve ser uma string')
    .isLength({ min: 2, max: 100 }).withMessage('O nome deve ter entre 2 e 100 caracteres'),
  
  body('price')
    .notEmpty().withMessage('O preço é obrigatório')
    .custom((value, { req }) => {
        if (typeof value === 'string' && value.includes(',')) {
        throw new Error('Por favor, use ponto (.) como separador decimal. Exemplo: 9.99');
        }
        return true;
    })
    .isFloat({ gt: 0 }).withMessage('O preço deve ser um número maior que zero'),
  
  body('description')
    .optional()
    .isString().withMessage('A descrição deve ser uma string'),
  
  body('image')
    .optional()
    .isString().withMessage('A imagem deve ser uma string em formato base64'),
  
  body('brandId')
    .notEmpty().withMessage('O ID da marca é obrigatório')
    .isString().withMessage('O ID da marca deve ser uma string')
    .custom((value) => {
      if (!isValidUuid(value)) {
        throw new Error('O ID da marca deve ser um UUID válido');
      }
      return true;
    }),
  
  validate
];

export const validateListProducts = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('A página deve ser um número inteiro maior ou igual a 1')
    .toInt(),
  
  query('pageSize')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('O tamanho da página deve ser um número inteiro entre 1 e 100')
    .toInt(),
  
  query('search')
    .optional()
    .isString().withMessage('O termo de busca deve ser uma string'),
  
  query('name')
    .optional()
    .isString().withMessage('O nome deve ser uma string'),
  
  validate
];

export const validateCreateBrand = [
  body('name')
    .notEmpty().withMessage('O nome da marca é obrigatório')
    .isString().withMessage('O nome deve ser uma string')
    .isLength({ min: 2, max: 50 }).withMessage('O nome deve ter entre 2 e 50 caracteres'),
  
  validate
];

export const validateIdParam = [
  param('id')
    .notEmpty().withMessage('O ID é obrigatório')
    .isString().withMessage('O ID deve ser uma string')
    .custom((value) => {
      if (!isValidUuid(value)) {
        throw new Error('O ID deve ser um UUID válido');
      }
      return true;
    }),
  
  validate
];