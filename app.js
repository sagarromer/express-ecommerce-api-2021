const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('dotenv/config');
//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

const api = process.env.API_URL;

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: "product1",
        image: 'some_url'
    }
    res.send(product)
});
app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body;

    res.send(newProduct);
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});