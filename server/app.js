const express = require('express');
const path = require('node:path')


const app = express();
app.listen(3000);

app.use(express.static(path.join(__dirname, './../client/')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './../client/index.html'));
});

// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, './../client/index.html'));
// });