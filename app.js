var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// ROUTES
// ===================================
var router = express.Router();

// route middleware 
router.use(function(req, res, next) {
  console.log(req.method, req.url);

  next();
})

app.get('/graph', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/graph.html'))
})

app.route('/upload')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, 'views/upload.html'))
  })

  .post(function(req, res) {
      
    //create an incoming form object
    var form = new formidable.IncomingForm();

    //especificamos que queremos subir y si es multiple archivos
    form.multiples = true;

    // guardamos todos los archivos en el /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // Cada ves que el archivo sea subido correctamente,
    // renombrarlo al nombre original
    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors
    form.on('error', function(err) {
      console.log('An error has ocurred: \n' + err);
    });

    // una vez que los archivos sean subidos, manda una respuesta
    // al cliente
    form.on('end', function() {
      res.end('success');
    });

    // parsea la data que venga del formulario
    form.parse(req);
  });

var server = app.listen(3000, function() {
  console.log('Server listening on port 3000');
});