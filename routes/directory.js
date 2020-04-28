const router = require('express').Router();
const memberData = require('../members.json');

router.get('/', (req, res) => {
    res.render('directory', {data:memberData})
})

module.exports = router;
