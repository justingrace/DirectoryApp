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

    res
        .status(200)
        .contentType("text/html")
        .end("Done! <a href='/'>Click here to go to homepage</a>");

})

router.get('/edit/:id', async (req, res) => {
    const ID = req.params.id;
    const member = await findMember(ID);
    console.log("member",member)

    if(member !== undefined ){
        res.render('edit', {data: member, admin_secret: keys.admin.secret})
    }
    else{
        res.send("Invalid id")
    }

})


router.post('/edit/:id', (req, res) => {
    const ID = req.params.id;
    editMember(ID, req.body)
    res
        .status(200)
        .contentType("text/html")
        .end("Done! <a href='/'>Click here to go to homepage</a>");


})

router.get('/delete/:id', (req, res) => {
    const ID = req.params.id;
    deleteMember(ID)

    res
        .status(200)
        .contentType("text/html")
        .end("Done! <a href='/'>Click here to go to homepage</a>");

})

router.get('/', async (req, res) => {
    const memberData = await allMembers()
    res.render('adminPortal', {data: memberData, admin_secret: keys.admin.secret})
})

module.exports = router;
