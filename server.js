const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.static('./index.html'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // Allow access from any origin
//     next();
// });

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
    res.status(200).send('POST request to homepage');
    res.status(404).send('Sorry, we cannot find that!')
});

app.listen(80, () => {
    console.log('Server is listening on port 80...');
});

module.exports = { app };