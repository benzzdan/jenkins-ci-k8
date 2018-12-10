const express = require('express');
const app = express();
const path = require('path');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, resp) => {
    resp.render('hello', {
        title: 'Hello World',
    })
})

module.exports = app;