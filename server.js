var express = require('express');
var app = express();
var mongoose = require('mongoose');
// logea las requests al terminal
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Configuración

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/prueba-mean');


// Localización de los ficheros estáticos
app.use(express.static(__dirname + '/public'));
// Muestra un log de todos los requests en el terminal
app.use(morgan('dev'));
// Parsea application/x-www-form-encoded
app.use(bodyParser.urlencoded({'extended':'true'}));
// Parsea application/json
app.use(bodyParser.json());
// Parsea application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

// Definimos el modelo
var Todo = mongoose.model('Todo', {
    text: String,
    done: Boolean
});

// Rutas

// Get todos los todos
app.get('/api/todos', function(req, res) {
    // Usar mongoose para coger todos los todos en la bd
    Todo.find(function(err, todos) {
        // Si hay error se manda el error, no se ejecuta nada bajo res.send
        if (err) {
            res.send(err);
        }
        res.json(todos); // Devuelve todos los todos
    });
});

// Crea un to-do y envía todos
app.post('/api/todos', function(req, res) {
    // Crea un to-do
    // La info viene de la petición AJAX de Angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }

        // Coge todos los todos después de crear
        Todo.find(function (err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    });
});

app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    });
});

app.get('', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(8080);
console.log('App listening on port 8080');