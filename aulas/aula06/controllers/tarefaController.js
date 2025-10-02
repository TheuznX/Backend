const model = require("../models/tarefaModel");
const listarTarefas = (req, res) => {
  const tarefas = model.listar();
  res.json(tarefas);
};

const criarTarefa = (req, res) => {
  const novaTarefa = model.criar(req.body);
  res.status(201).json(novaTarefa);
};

const pesquisarId = (req, res) => {
  const { id } = req.params;
  const tarefaEncontrada = tarefas.find((item) => item.id === parseInt(id));
  if (tarefaEncontrada) return res.json(tarefaEncontrada);
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

const alterarTarefa = (req, res) => {
  const { id } = req.params;
  const tarefaEncontrada = tarefas.find((item) => item.id === parseInt(id));
  if (tarefaEncontrada) {
    tarefaEncontrada.nome = req.body.nome;
    tarefaEncontrada.concluida = req.body.concluida;
    return res.json(tarefaEncontrada);
  }
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

const apagarTarefa = (req, res) => {
  const { id } = req.params;
  const posicao = tarefas.findIndex((item) => item.id === parseInt(id));
  if (posicao >= 0) {
    tarefas.splice(posicao, 1);
    return res.status(204).end();
  }
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

module.exports = {
  listarTarefas,
  criarTarefa,
  pesquisarId,
  alterarTarefa,
  apagarTarefa,
};
