const request = require('supertest');
const app = require('../app');

const req = request(app);

// Variável global para armazenar o ID retornado no POST (passo 3.f)
let createdTaskId = null;

describe('Testes de Integração da API de Tarefas', () => {

    it('GET /tarefas - Deve retornar status 200 e array JSON', async () => {
        const res = await req.get('/tarefas');
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
    });

    it('POST /tarefas - Deve criar tarefa, retornar 201 e um JSON', async () => {
        const novaTarefa = { nome: "Estudar Node", concluida: false };
        const res = await req.post('/tarefas')
            .send(novaTarefa);

        expect(res.statusCode).toBe(201);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('id');

        // Salva o id para testes subsequentes (passo 3.f)
        createdTaskId = res.body.id;
    });

    it('GET /tarefas/id - Deve retornar status 200 e JSON da tarefa criada', async () => {
        const res = await req.get(`/tarefas/${createdTaskId}`);
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('id', createdTaskId);
    });

    it('GET /tarefas/1 - Deve retornar status 404 para ID não existente/teste', async () => {
        const res = await req.get('/tarefas/1');
        expect(res.statusCode).toBe(404);
        expect(res.headers['content-type']).toMatch(/json/);
    });

    it('PUT /tarefas/id - Deve atualizar tarefa, retornar 200 e um JSON', async () => {
        const tarefaAtualizada = { nome: "Estudar Node e Express", concluida: true };
        const res = await req.put(`/tarefas/${createdTaskId}`)
            .send(tarefaAtualizada);

        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('id', createdTaskId);
    });

    it('PUT /tarefas/1 - Deve retornar status 404 para ID não existente/teste', async () => {
        const res = await req.put('/tarefas/1').send({ nome: "Teste", concluida: false });
        expect(res.statusCode).toBe(404);
        expect(res.headers['content-type']).toMatch(/json/);
    });

    it('DELETE /tarefas/id - Deve remover tarefa, retornar status 204 e sem conteúdo', async () => {
        const res = await req.delete(`/tarefas/${createdTaskId}`);
        expect(res.statusCode).toBe(204);
        expect(res.text).toBe(''); // Sem conteúdo
    });

    it('DELETE /tarefas/1 - Deve retornar status 404 para ID não existente/teste', async () => {
        const res = await req.delete('/tarefas/1');
        expect(res.statusCode).toBe(404);
        expect(res.headers['content-type']).toMatch(/json/);
    });
});