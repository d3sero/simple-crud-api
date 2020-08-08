const express = require('express');

const router = express.Router;

// Get All
router.get('/', (req, res) => {
    res.json({
       message: 'GET all books'
    });
});

// Get One
router.get('/:id', (req, res) => {
    res.json({
        message: 'GET one book by id'
    });
});

// Create One
router.post('/', (req, res) => {
    res.json({
        message: 'CREATE a book'
    });
});

// Update One
router.put('/:id', (req, res) => {
    res.json({
        message: 'UPDATE a book'
    });
});

// Delete One
router.delete('/:id', (req, res) => {
    res.json({
        message: 'DELETE a book by id'
    });
});
