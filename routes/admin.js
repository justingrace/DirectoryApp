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
        message: "<p>Success!</p>",
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
    let memberData = await allMembers()

    // memberData memberData.map(mem => mem.toObject())

    memberData = memberData.map(mem => {
        if(mem.image.data){
            return {
                ...mem.toJSON(),
                image: {
                    data: 'data:'+ mem.image.contentType +';base64,' + mem.image.data.toString('base64')
                }
            }
        }
        else return mem

    })


    res.render('adminPortal', {data: memberData, admin_secret: keys.admin.secret})
})

module.exports = router;
