'use strict';

let express = require('express');
let router = new express.Router();
let db = require('../queries.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
 });
router.get('/api/items', db.getAllItems);
router.get('/api/items/:id', db.getSingleItem);
router.post('/api/items', db.createItem);
router.put('/api/items/:id', db.updateItem);
router.delete('/api/items/:id', db.removeItem);

module.exports = router;
