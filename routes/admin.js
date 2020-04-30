const router = require('express').Router();
const keys = require('../config/keys')
const {allMembers, editMember, findMember, deleteMember} = require('../database');

router.post('/validation/:id', (req, res) => {

    let valid=false;
    const ID = req.params.id;
    if(req.body.valid !== undefined && req.body.valid==="on"){
        valid= true;
    }

    editMember(ID, {valid:!valid})

    res.render('message', {
        message: "<p>Success! Validated member! </p>",
        link: "/admin/"+keys.admin.secret})

})

router.get('/delete/:id', (req, res) => {
    const ID = req.params.id;
    deleteMember(ID)

    res.render('message', {
        message: "<p>Success! Deleted member! </p>",
        link: "/admin/"+keys.admin.secret})


})

router.get('/', async (req, res) => {
    const memberData = await allMembers()

    res.render('adminPortal', {data: memberData, admin_secret: keys.admin.secret})
})

module.exports = router;
