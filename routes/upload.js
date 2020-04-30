const router = require('express').Router();
const multer = require("multer");
const fs = require("fs");
const Member = require("../models/member");
const path = require('path');
const jo = require('jpeg-autorotate')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({storage: storage})


function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

router.get('/', (req, res) => res.render('upload'))
router.post(
    "/",
    upload.single("file"),
    (req, res) => {
        console.log(req.file.path)
        const img = fs.readFileSync(req.file.path);
        jo.rotate(img, {quality: 100})
            .then(({buffer, orientation, dimensions, quality}) => {
                // console.log(`Orientation was ${orientation}`)
                // console.log(`Dimensions after rotation: ${dimensions.width}x${dimensions.height}`)
                // console.log(`Quality: ${quality}`)
                const finalImg = {
                    data: buffer,
                    contentType: req.file.mimetype
                };

                const name = req.body.name, phone = req.body.phone, email = req.body.email,
                    birthday = ordinal_suffix_of(req.body.birthdayDay) + " " + req.body.birthdayMonth;
                let newMember = new Member({
                    name,
                    phone,
                    email,
                    birthday,
                    image: finalImg,
                    valid: false
                })


                newMember.save(function (err, member) {
                    if (err) {
                        console.log("createMember [in saving mongoose Member]", err);
                        res.render('message', {
                            message: "<p>Something went wrong! Please try again!</p>",
                            link: "/"
                        })
                    }
                    if (!err) {

                        res.render('message', {
                            message: "<p>Success! We will validate your details and add them soon! </p> <p><u>Your secret passcode is:</u> " + member.id + ". Keep it in case you need to edit your details!</p>",
                            link: "/"
                        })

                    }
                })
            })
            .catch(() => {
                const encode_image = img.toString('base64');
                const finalImg = {
                    data: Buffer.from(encode_image, 'base64'),
                    contentType: req.file.mimetype
                };

                const name = req.body.name, phone = req.body.phone, email = req.body.email,
                    birthday = ordinal_suffix_of(req.body.birthdayDay) + " " + req.body.birthdayMonth;
                let newMember = new Member({
                    name,
                    phone,
                    email,
                    birthday,
                    image: finalImg,
                    valid: false
                })

                newMember.save(function (err, member) {
                    if (err) {
                        console.log("createMember [in saving mongoose Member]", err);
                        res.render('message', {
                            message: "<p>Something went wrong! Please try again!</p>",
                            link: "/"
                        })
                    }
                    if (!err) {

                        res.render('message', {
                            message: "<p>Success! We will validate your details and add them soon! </p> <p><u>Your secret passcode is:</u> " + member.id + ". Keep it in case you need to edit your details!</p>",
                            link: "/"
                        })

                    }
                })

            })
    })


router.get('/image/:id', (req, res) => {
    Member.findById(req.params.id, (err, data) => {
        if (!err) {
            res.contentType(data.image.contentType);
            res.send(data.image.data);
        }
    });
});

module.exports = router;
