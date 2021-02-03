'use strict';

const { Router, response } = require('express');
const router = new Router();
const Place = require('./../models/place');

var json = require('hbs-json');
var hbs = require('hbs');

hbs.registerHelper('json', json);

// display all bookshops and coffee places
router.get('/', (req, res, next) => {
    // get all places
    // pass them to view

    Place.find()
        .then((places) => {
            console.log(places);
            res.render('index', { places });
        })
        .catch((error) => {
            next(error);
        });
});

// create a new place
router.get('/create', (req, res, next) => {
    //render create view
    res.render('places/create');
});

router.post('/create', (req, res, next) => {
    const data = req.body;
    console.log(data);

    Place.create({
            name: data.name,
            type: data.type,
            location: {
                coordinates: [data.longitude, data.latitude],
                type: 'Point'
            }
        })
        .then((place) => {
            res.redirect(`/places/${place._id}`);
        })
        .catch((error) => {
            next(error);
        });
});

//delete place
router.get('/delete/:id', (req, res, next) => {
    Place.findById(req.params.id).then((place) => {
        res.render('places/confirmDeletion', {
            place
        });
    });
});
router.post('/delete/:id', (req, res, next) => {
    Place.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            next(error);
        });
});

//update place
router.get('/update/:id', (req, res, next) => {
    // load current values from database: Place.findById(id)
    // render('edit') form and pass in current values
    // submit edit form to POST /update
    const id = req.params.id;
    Place.findById(id)
        .then((place) => {
            res.render('places/update', { place: place });
        })
        .catch((error) => {
            next(error);
        });
});

router.post('/update/:id', (req, res, next) => {
    //find by id and update
    const data = req.body;
    Place.findByIdAndUpdate(req.params.id, {
            name: data.name,
            type: data.type,
            location: {
                coordinates: [data.longitude, data.latitude],
                type: 'Point'
            }
        })
        .then((place) => {
            res.redirect(`/places/${place.id}`);
        })
        .catch((error) => {
            next(error);
        });
    //redirect to /:id page
});

//display single place
router.get('/places/:id', (req, res, next) => {
    // Place.find(id)
    Place.findById(req.params.id).then((place) => {
        res.render('places/single', {
            place: place
        });
    });
});
module.exports = router;