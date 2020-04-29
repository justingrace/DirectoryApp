const router = require('express').Router();
const multer = require("multer");
const fs = require("fs");
const Member = require("../models/member");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage })

router.get('/', (req, res) => res.render('upload'))
router.post(
    "/",
    upload.single("file"),
    (req, res) => {
        console.log(req.file.path)
        const img = fs.readFileSync(req.file.path);
        const encode_image = img.toString('base64');
        const finalImg = {
            data:  Buffer.from(encode_image, 'base64'),
            contentType: req.file.mimetype
        };

        const name = req.body.name, contact = req.body.contact;

        let newMember = new Member({
            name,
            contact,
            image: finalImg,
            valid: false
        })


        newMember.save(function (err) {
            if (err) {
                console.log("createMember",err);
            }
            if(!err) res.send("success!")
        })

    }
);

router.get('/image/:id',(req,res)=>{
    Member.findById(req.params.id,(err,data)=>{
        if(!err){
            res.contentType(data.image.contentType);
            res.send(data.image.data);
        }
    });
});

module.exports = router;
