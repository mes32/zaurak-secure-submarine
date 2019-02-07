const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('req.user:', req.user);
    if (req.isAuthenticated()) {
        const queryText = `
        SELECT * FROM "person";
        `;
        pool.query(queryText)
            .then(results => res.send(results.rows))
            .catch(error => {
                console.log('Error making SELECT FROM "person":', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;