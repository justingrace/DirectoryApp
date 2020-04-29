const router = require('express').Router();
const {allMembers} = require('../database');

router.get('/', async (req, res) => {
    const memberData = await allMembers()
    res.render('directory', {data: memberData})
})

module.exports = router;
