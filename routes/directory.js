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
    let memberData = await allMembers()

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

    res.render('directory', {data: memberData})
})

module.exports = router;
