const express = require('express');
const path = require('node:path')


const root = path.join(__dirname, './client/');

const app = express();
app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile('index.html', {root});
});

app.use(express.static(root));