import { body } from "express-validator";
import { Currency } from "../types/ride";

const clientNameValidation = body('clientName')
    .isString()
    .withMessage('client name should be string')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Length of clientName is not correct');

const driverIdValidation = body('driverId')
    .isInt({ gt: 0 })
    .withMessage('driverId must be positive number');

const priceValidation = body('price')
    .isFloat({ gt: 0 })
    .withMessage('price must be a positive number');

const currencyValidation = body('currency')
    .isString()
    .withMessage('currency name should be string')
    .trim()
    .isIn(Object.values(Currency)) // только допустимые значения enum Currency
    .withMessage('currency must be either "usd" or "eur"');

const fromAddressValidation = body('fromAddress')
    .isString()
    .withMessage('fromAddress should be string')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('fromAddress must be a positive number');

const toAddressValidation = body('toAddress')
    .isString()
    .withMessage('fromAddress should be string')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('toAddress must be a positive number');

// Набор middleware-валидаторов тела запроса на создание поездки.
export const ridesInputDtoValidation = [
    clientNameValidation,
    driverIdValidation,
    priceValidation,
    currencyValidation,
    fromAddressValidation,
    toAddressValidation,
];
