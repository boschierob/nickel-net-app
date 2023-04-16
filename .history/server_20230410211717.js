const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(3002, function () {
    console.log('server running')
});
