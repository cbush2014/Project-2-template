// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');

// Database
const db = require('./models/index');

// Set port of app using Heroku guidelines
const PORT = process.env.PORT || 8080;

// Create an instance of the express app.
const app = express();

// View engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//ROUTES - moved to staticController.js
app.use(require('./controllers/staticController'));

// Synchronize my schema
db.sequelize.sync({ force: true })
    .then(() => {

        app.listen(PORT, () => {
            console.log(`==> Server listening at http://localhost:${PORT}/`);

        });

    });

