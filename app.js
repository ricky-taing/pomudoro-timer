const express = require('express');
const app = express();

app.use(express.static('./index.html'));
app.use(express.urlencoded({ extended: false }));

app.get('/testing', (req, res) => {
    res.send('Just testing...');
});

app.post('/settings', (req, res) => {
    console.log(req.body);
    res.send('POST ');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});

module.exports = { app };