'use strict';

let promise = require('bluebird');
let options = {
    // intialization options
    promiseLib: promise,
};

let pgp = require('pg-promise')(options);
// let connectionString = 'postgres://postgres:localhost:5432/jaia';
let db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'jaia',
    user: 'postgres',
    password: 'Postgres',
});

// add query functions
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getAllItems(req, res, next) {
    db.any('select * from items')
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrived ALL items',
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getSingleItem(req, res, next) {
    let itemID = parseInt(req.params.id);
    db.one('select * from items where id = $1', itemID)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'retrived ONE item',
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function createItem(req, res, next) {
    db.none('insert into items(name, make, model, serial_number, description)' +
    'values(${name}, ${make}, ${model}, ${serial_number}, ${description})'
    , req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'inserted one item',
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function updateItem(req, res, next) {
    db.none('update items set name=$1, make=$2, model=$3, ' +
    'serial_number=$4, description=$5 WHERE id=$6',
    [req.body.name, req.body.make, req.body.model, req.body.serial_number,
    req.body.description, parseInt(req.params.id)])
        .then(function() {
            console.log(req.body);
            console.log(parseInt(req.params.id));
            res.status(200)
                .json({
                    status: 'success',
                    message: 'updated item',
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function removeItem(req, res, next) {
    let itemID = parseInt(req.params.id);
    db.result('delete from items where id = $1', itemID)
        .then(function(result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} item',
                });
        })
        .catch(function(err) {
            return next(err);
        });
}

module.exports = {
    getAllItems: getAllItems,
    getSingleItem: getSingleItem,
    createItem: createItem,
    updateItem: updateItem,
    removeItem: removeItem,
};
