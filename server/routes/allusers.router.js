const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT id, username, clearance_level AS clearance FROM "person";
    `;
    pool.query(queryText)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT FROM "person":', error);
            res.sendStatus(500);
        });
});

module.exports = router;