const router = require('express').Router();
const multer = require("multer");
const fs = require("fs");
const path = require('path')
const slugify = require('slugify')
const uid = require('uid');


const upload = multer({
    dest: path.join(__dirname, '../public/directory_images')
});

const handleError = (err, res) => {
    console.log(err)
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

router.get('/', (req, res) => res.render('upload'))
router.post(
    "/",
    upload.single("file"),
    (req, res) => {
        const name = req.body.name, contact = req.body.contact, slugName= slugify(name);

        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, `../public/directory_images/${slugName+contact}${path.extname(req.file.originalname)}`);

        fs.readFile('./members.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                obj = JSON.parse(data);
                obj.push({id: uid(), name: name, contact:contact, image:`${slugName + contact}${path.extname(req.file.originalname)}`, valid: false});
                json = JSON.stringify(obj);
                fs.writeFile('./members.json', json, 'utf8', () => {console.log("Write successful!")});
            }});


        if (req.file.mimetype.indexOf("image") >= 0) {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
                res
                    .status(200)
                    .contentType("text/html")
                    .end("<a href='/'>Click here to go to homepage</a>");

            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(403)
                    .contentType("text/plain")
                    .end("Only .png and .jpg files are allowed!");
            });
        }
    }
);

module.exports = router;
