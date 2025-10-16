    const supertest = require('supertest');

   const app = require('../app');

   const request = supertest(app);

   const url = '/tarefas';

   let id = null;

   describe('Testes do recurso /tarefas', () => {
    test('POST / deve retornar 201', async () => {
        
        
    test('GET / deve retornar 200', async () => {
        
    });
        
    test('GET /:id deve retornar 200', async () => {
        
    });
        
    test('PUT /:id deve retornar 200', async () => {
        
    });
        
    test('DELETE /:id deve retornar 204', async () => {
        
    });
