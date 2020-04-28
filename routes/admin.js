const router = require('express').Router();
let memberData = require('../members.json');
const fs = require('fs')
const keys = require('../config/keys')

router.post('/validation/:id', (req, res) => {

    let valid=false;
    const ID = req.params.id;
    if(req.body.valid !== undefined && req.body.valid==="on"){
        valid= true;
        console.log(valid)
    }

    memberData = memberData.map((member) => {
        if (member.id === ID) {
            return {
                ...member,
                valid: !valid //toggle validity
            }
        } else return member
    })
    json = JSON.stringify(memberData);
    fs.writeFile('./members.json', json, 'utf8', () => {
        console.log("Write successful!")
    });

    res
        .status(200)
        .contentType("text/html")
        .end("Done! <a href='/'>Click here to go to homepage</a>");

})

router.get('/edit/:id', (req, res) => {
    const ID = req.params.id;
    const member = memberData.filter(member => member.id === ID);

    if(member.length===1){
        res.render('edit', {data: member[0], admin_secret: keys.admin.secret})
    }
    else{
        res.send("Invalid id")
    }

})


router.post('/edit/:id', (req, res) => {
    const ID = req.params.id;

    memberData = memberData.map(member => {
        if (member.id === ID) {
            return {
                ...member,
                name: req.body.name || member.name,
                contact: req.body.contact || member.contact,
            }
        } else return member
    })

    json = JSON.stringify(memberData);
    fs.writeFile('./members.json', json, 'utf8', () => {
        console.log("Write successful!")
    });

    res
        .status(200)
        .contentType("text/html")
        .end("Done! <a href='/'>Click here to go to homepage</a>");


})

router.get('/delete/:id', (req, res) => {
    const ID = req.params.id;
    let newMemberData = [];

    for(let i=0;i<memberData.length; i++){
        if(memberData[i].id !== ID){
            newMemberData.push(memberData[i])
        }
    }

    json = JSON.stringify(newMemberData);
    fs.writeFile('./members.json', json, 'utf8', () => {
        console.log("Write successful!")
    });

    res
        .status(200)
        .contentType("text/html")
        .end("Done! <a href='/admin/'>Click here to go to homepage</a>");

})

router.get('/', (req, res) => {
    console.log()
    res.render('adminPortal', {data: memberData, admin_secret: keys.admin.secret})
})

module.exports = router;
