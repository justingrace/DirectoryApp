const router = require('express').Router();
const {allMembers, editMember, findMember} = require('../database');


router.get('/edit', (req, res) => {
    res.render('editMain');
})

router.post('/edit', async (req, res) => {
    const ID = req.body.passcode;
    const member = await findMember(ID);
    if(member){
        res.render('edit', {data: member})
    }
    else{
        res.render('message', {
            message: "<p>Invalid Secret Passcode! Please try again!</p>",
            link: "/"})
    }

})

router.post('/editMember/:id', ((req, res) => {
    const ID = req.params.id;
    editMember(ID, req.body)

    res.render('message', {
        message: "<p>Success! Your details have been edited! </p>",
        link: "/"})

}))

router.get('/', async (req, res) => {
    const memberData = await allMembers()
    res.render('directory', {data: memberData})
})

module.exports = router;
