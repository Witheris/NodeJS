const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const { a, b, c } = req.query;

    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
        return res.json({ header: "Error" });
    }

    const result = (numA * numB * numC) / 3;

    res.json({
        header: "Calculated",
        body: result.toString()
    });
});

module.exports = router;