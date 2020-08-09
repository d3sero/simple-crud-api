const express = require('express');
const router = express.Router();
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const books = db.get('books');

const schema = Joi.object({
    title: Joi.string().trim().required(),
    author: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    language: Joi.string().trim().required(),
});

// Get All
router.get('/', async (req, res, next) => {
    try {
        const items = await books.find({});
        res.json(items);
    } catch (error) {
        next(error);
    }
    res.json({
       message: 'GET all books'
    });
});

// Get One
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await books.findOne({
            _id: id,
        });
        if(!item) return next();
        res.json(item);
    } catch (error) {
        next(error);
    }
});

// Create One
router.post('/', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await books.insert(value);
        res.json(inserted);
    } catch (error) {
        next(error);
    }
});

// Update One
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await books.findOne({
            _id: id,
        });
        if(!item) return next();
        await books.update({
            _id: id
        }, {
            $set: {
                ...value
            }
        });
        res.json(value);
    } catch (error) {
        next(error);
    }
});

// Delete One
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = await schema.validateAsync(req.body);
        const deleted = await books.remove({_id: id});
        res.json({
            message: "Success"
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
