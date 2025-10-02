var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(function(req, res, next) {
    var tarefaRouter = require('./routes/tarefaRouter');
    app.use('/tarefas', tarefaRouter);
  res.status(404).json({ msg: "Not Found" });
});


app.use(function(err, req, res, next) {
 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({ msg: err.message });
});

module.exports = app;