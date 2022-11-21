// import express and initalize the 'app' variable
const express = require('express');
const app = express();
// setup PORT
const PORT = process.env.PORT || 3002;

// setup express to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// static middlewhere for assets in public folder--double-check if there needs to be a period before /
app.use(express.static('public'));

// route files to API and HTML routes
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

// app setup locally. default port is 3002 (see line 5)
app.listen(PORT, () => {
    console.log(`App listening on Port: ${PORT} 🚀`);
});