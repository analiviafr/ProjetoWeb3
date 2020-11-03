const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/files', express.static(`./src/controllers/uploads`));

require('./controllers/authController')(app);
require('./controllers/projectController')(app);
require('./controllers/ipController')(app);

app.listen(process.env.PORT || 3000);
