const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        header: "Hello",
        body: "Octagon NodeJS Test"
    });
});

module.exports = router;