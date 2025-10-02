const express = require('express');
const controller = require('../controllers/tarefaController');
const router = express.Router();

router.get("/", controller.listarTarefas);

router.post("/", controller.criarTarefa);

router.get("/:id", controller.pesquisarId);

router.put("/:id", controller.alterarTarefa);

router.delete("/:id",controller.apagarTarefa);

module.exports = router;
