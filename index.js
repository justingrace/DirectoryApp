require('dotenv').config()
const express = require('express')
const directoryRoutes = require('./routes/directory.js');
const uploadRoutes = require('./routes/upload.js');
const adminRoutes= require('./routes/admin.js');
const app = express();
const path = require('path')
const memberData = require('../members.json');

const keys = require('./config/keys');
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, 'public')));



app.set('view engine', 'ejs');
app.use('/upload', uploadRoutes)
app.use('/admin/'+keys.admin.secret, adminRoutes);

app.get('/', (req, res) => {
    res.render('directory', {data:memberData})
})




app.listen(process.env.PORT || 3000, () => {
    console.log('app running')
})
