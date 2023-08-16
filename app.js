const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

// Configuración de cabeceras CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/upload', (req, res) => {
  let EDFile = req.files.file;
  EDFile.mv(`./files/${EDFile.name}`, err => {
    if (err) return res.status(500).send({ message: err });

    return res.status(200).send({ message: 'File upload' });
  });
});

app.listen(3000, () => console.log('Corriendo'));
