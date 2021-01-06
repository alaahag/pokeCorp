require('dotenv').config();
const express = require('express'),
sequelize = require('sequelize'),
api = require('./server/routes/api.js'),
path = require('path'),
app = express(),
PORT = process.env.PORT,
URI = process.env.URI;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/api', api);

new sequelize(URI)
.authenticate()
.then (() => {
    app.listen(PORT, () => {
        console.log(`Server is up and running on port: ${PORT}`);
    });
})
.catch(err => {
    console.log(err.message);
    exit(1);
});