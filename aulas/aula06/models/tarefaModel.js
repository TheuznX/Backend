const tarefas = [];

const listar = () => {
    return tarefas;
}

const criar = (dados) => {
    const novaTarefa = {
    ...dados,
    id: tarefas.length + 1,
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
};
module.exports = { criar, listar };