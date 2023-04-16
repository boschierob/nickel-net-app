const express = require('express');
const app = express();

app.use(express.json());
app.set('view engine', 'ejs');

app.listen(3002, function () {
    console.log('server running')
});
