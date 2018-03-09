'use strict';

let express = require('express');
let router = new express.Router();
let db = require('../queries.js');
let celebrate = require('celebrate');
let joi = require('joi');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
 });
router.get('/api/items', db.getAllItems);
router.get('/api/items/:id', db.getSingleItem);
router.post('/api/items', db.createItem);
router.put('/api/items/:id', celebrate.celebrate({
  body: {
    name: joi.string().required(),
    make: joi.string(),
    model: joi.string(),
    serial_number: joi.string(),
    description: joi.string(),
  },
}), db.updateItem);
router.delete('/api/items/:id', db.removeItem);

module.exports = router;
