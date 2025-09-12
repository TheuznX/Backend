const express = require('express');
const tarefas = [
    { id: 1, nome: "Estudar middleware", concluida: false },
    { id: 2, nome: "Praticar Express", concluida: true }
  ];
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => {
    const dataHora = new Date();
    console.log(`[${dataHora.toISOString()}] ${req.method} ${req.url}`);
    next();
  });
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
  module.exports = app;
  const router = express.Router();
  router.get('/tarefas', (req, res) => {
    res.json(tarefas);
  });
  router.post('/tarefas', (req, res) => {
    const { nome, concluida } = req.body;
    const novaTarefa = { id: tarefas.length + 1, nome, concluida: concluida || false };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
  });
  router.get('/tarefas/:tarefaId', (req, res) => {
    const tarefa = tarefas.find(t => t.id === parseInt(req.params.tarefaId));
    if (tarefa) {
      res.json(tarefa);
    } else {
      res.status(404).send('Tarefa não localizada');
    }
  });
  router.put('/tarefas/:tarefaId', (req, res) => {
    const tarefa = tarefas.find(t => t.id === parseInt(req.params.tarefaId));
    if (tarefa) {
      tarefa.nome = req.body.nome || tarefa.nome;
      tarefa.concluida = req.body.concluida !== undefined ? req.body.concluida : tarefa.concluida;
      res.json(tarefa);
    } else {
      res.status(404).send('Tarefa não localizada');
    }
  });
  router.delete('/tarefas/:tarefaId', (req, res) => {
    const index = tarefas.findIndex(t => t.id === parseInt(req.params.tarefaId));
    if (index !== -1) {
      tarefas.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).send('Tarefa não localizada');
    }
  });
  app.use('/', router);
  router.get('/tarefas/:tarefaId', (req, res, next) => {
    const tarefa = tarefas.find(t => t.id === parseInt(req.params.tarefaId));
    if (!tarefa) {
      return next(new Error("Tarefa não localizada"));
    }
    res.json(tarefa);
  });
  router.put('/tarefas/:tarefaId', (req, res, next) => {
    const tarefa = tarefas.find(t => t.id === parseInt(req.params.tarefaId));
    if (!tarefa) {
      return next(new Error("Tarefa não localizada"));
    }
    tarefa.nome = req.body.nome || tarefa.nome;
    tarefa.concluida = req.body.concluida !== undefined ? req.body.concluida : tarefa.concluida;
    res.json(tarefa);
  });
  router.delete('/tarefas/:tarefaId', (req, res, next) => {
    const index = tarefas.findIndex(t => t.id === parseInt(req.params.tarefaId));
    if (index === -1) {
      return next(new Error("Tarefa não localizada"));
    }
    tarefas.splice(index, 1);
    res.status(204).send();
  });
  app.use((err, req, res, next) => {
    res.status(400).json({ erro: err.message });
  });
    
                