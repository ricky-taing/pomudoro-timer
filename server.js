const express = require('express');
const app = express();

app.use(express.static('./index.html'));
app.use(express.urlencoded({ extended: false }));

app.get('/testing', (req, res) => {
    res.send('Just testing...');
});

// app.post('/settings', (req, res) => {
// });

app.post('/file-upload', (req, res) => {
    // Check if file is image
    // Check if file already exists
    // Check file size
    // Allow certain file formats

    // Move to designated directory

    console.log(req.body);
    res.send('POST request to homepage');
    res.status(200);
});

app.listen(80, () => {
    console.log('Server is listening on port 80...');
});

module.exports = { app };