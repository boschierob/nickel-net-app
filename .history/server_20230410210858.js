const express = require('express');
const app = express();

app.use(json());
app.set('view engine', 'ejs');
