// 1. importar o framework
const express = require("express");

// 2. criar uma instância da aplicação
const app = express();

// middleware de aplicação
app.use((req, res, next) => {
  console.log("Passei pelo middleware de app");
  next();
});

// middleware de roteamento
const router = express.Router();

// rota GET -> listar tarefas
router.get('/', (req, res) => {
  res.send("Listar as tarefas");
});

// rota POST -> criar tarefa
console.log(req.body);
router.post('/', (req, res) => {
  res.status(201).send("Tarefa criada com sucesso");
});

// rota PUT -> atualizar tarefa
router.put('/:id', (req, res) => {
  const { id } = req.params; // desestruturando o objeto params
  if (id == 1) return res.send("Tarefa atualizada");
  res.status(404).send("Tarefa não encontrada");
});

// rota DELETE -> excluir tarefa
router.delete('/:id', (req, res) => {
  const { id } = req.params; // desestruturando o objeto params
  if (id == 1) return res.status(204).end(); // sem conteúdo
  res.status(404).send("Tarefa não encontrada");
});

// registra o router no caminho /tarefas
app.use('/tarefas', router);

// rota simples na raiz
app.get('/', (req, res) => {
  res.send("Olá!");
});

// middleware de erro
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

// 3. iniciar a aplicação em uma porta
app.listen(3000, () => {
  console.log("App está On!");
});