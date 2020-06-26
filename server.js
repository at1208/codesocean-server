const chalk = require('chalk');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

//IMPORT ROUTES
const blogRoutes = require('./routes/blog');


//MONGODB DATABASE CONNECTION
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log(chalk.bold.blueBright('Connected to DB')))
    .catch(err => {
        console.log(err);
    });

// MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
} else{
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//ROUTES MIDDLEWARES
app.use('/api', blogRoutes);


//LISTEN PORT
const Port = process.env.PORT || 8000;
app.listen(Port, () => console.log(chalk.whiteBright.bold(`Server listening to port ${Port}`)))
