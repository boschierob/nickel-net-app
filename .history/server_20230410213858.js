require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index.ejs", {
      isLogged: false
    })
});

app.listen(3002);
