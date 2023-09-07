import supertest from "supertest";
import {beforeEach, describe, expect, test} from "@jest/globals";
import dotenv from "dotenv";
import {insertTodoTest, insertUserTest, lastPk, lastPkTodo, removeTodoTest, removeUserTest} from "./util-test.js";
import app from "../src/app/index.js";
import userService from "../src/service/userService.js";

dotenv.config();

const userServiceTest = new userService();

let token;

beforeEach(async ()=>{
    await removeTodoTest()
    await removeUserTest();
    await insertUserTest();
    await insertTodoTest();
    token = await userServiceTest.login({email:'diory@gmail.com',password:'password'});
});


describe('GET /todolist',()=>{
    test('GET all todolist, with token valid',async ()=>{
        const response = await supertest(app)
            .get('/todolist')
            .set('Authorization',token);
        expect(response.status).toBe(200);
        const todolist = response.body.data.todolist;
        expect(todolist).toHaveLength(1);
        expect(todolist[0]).toHaveProperty('todo','Belajar Node Js');
        expect(todolist[0]).toHaveProperty('userId',await lastPk()-1);
    });

    test('GET all todolist, with token invalid',async ()=>{
        const response = await supertest(app)
            .get('/todolist')
            .set('Authorization','invalidtoken');
        expect(response.status).toBe(401);
        expect(response.body.message).toMatch(/Unauthorized/i);
    });

    test('GET all todolist, with token empty',async ()=>{
        const response = await supertest(app)
            .get('/todolist')
            .set('Authorization','');
        expect(response.status).toBe(401);
        expect(response.body.message).toMatch(/Unauthorized/i);
    });
});

describe('POST /todolist',()=>{
    test('Insert Todo success',async ()=>{{
        const response = await supertest(app)
            .post('/todolist')
            .set('Authorization',token)
            .send({todo :'Belajar Golang'})
        expect(response.status).toBe(201);
        expect(response.body.message).toMatch(/add todo success/i);
        expect(response.body.data.id).toBe(await lastPkTodo());
    }});


    test('Insert Todo fail, invalid token',async ()=>{{
        const response = await supertest(app)
            .post('/todolist')
            .set('Authorization','dsds')
            .send({todo :'Belajar Golang'})
        expect(response.status).toBe(401);
        expect(response.body.message).toMatch(/Unauthorized/i);
    }});

    test('Insert Todo fail, token empty',async ()=>{{
        const response = await supertest(app)
            .post('/todolist')
            .set('Authorization','')
            .send({todo :'Belajar Golang'})
        expect(response.status).toBe(401);
        expect(response.body.message).toMatch(/Unauthorized/i);
    }});

    test('Insert Todo fail, invalid input',async ()=>{{
        const response = await supertest(app)
            .post('/todolist')
            .set('Authorization',token)
            .send({todo :''})
        expect(response.status).toBe(400);
        expect(response.body.message).not.toBe('');
    }});
});


describe('PUT /todolist/:id', ()=>{
    test('Update success',async ()=>{
        const response  = await supertest(app)
            .put(`/todolist/${await lastPkTodo() - 1}`)
            .set('Authorization',token)
            .send({todo : 'Belajar Golang'});

        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/update todo success/i);
    });

    test('update fail, not found todo',async ()=>{
        const response  = await supertest(app)
            .put(`/todolist/${await lastPkTodo() + 1}`)
            .set('Authorization',token)
            .send({todo : 'Belajar Golang'});
        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/todo not found/i);
    });

    test('Update Todo fail, invalid input',async ()=>{{
        const response = await supertest(app)
            .post('/todolist')
            .set('Authorization',token)
            .send({todo :''})
        expect(response.status).toBe(400);
        expect(response.body.message).not.toBe('');
    }});

    test('Update fail, with token invalid',async ()=>{
        const response  = await supertest(app)
            .put(`/todolist/${await lastPkTodo() - 1}`)
            .set('Authorization','dsd')
            .send({todo : 'Belajar Golang'});

        expect(response.status).toBe(401);
        expect(response.body.message).toMatch(/unauthorized/i);
    });
    test('Update fail, with no token',async ()=>{
        const response  = await supertest(app)
            .put(`/todolist/${await lastPkTodo() - 1}`)
            .send({todo : 'Belajar Golang'});
        expect(response.status).toBe(401);
        expect(response.body.message).toMatch(/unauthorized/i);
    });

    test('Update fail, forbidden',async ()=>{
        const response  = await supertest(app)
            .put(`/todolist/${await lastPkTodo()}`)
            .set('Authorization',token)
            .send({todo : 'Belajar Golang'});

        expect(response.status).toBe(403);
        expect(response.body.message).toMatch(/forbidden/i);
    });
});

describe('DELETE /todolist/:id',()=>{
    test('Delete todo success',async ()=>{
        const response  = await supertest(app)
            .delete(`/todolist/${await lastPkTodo() - 1}`)
            .set('Authorization',token);

        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/delete todo success/i);
    });

    test('delete fail, not found',async ()=>{
        const response  = await supertest(app)
            .delete(`/todolist/${await lastPkTodo() + 1}`)
            .set('Authorization',token)

        expect(response.status).toBe(404);
        expect(response.body.message).toMatch(/todo not found/i);
    });

    test('delete fail, with token invalid',async ()=>{
        const response  = await supertest(app)
            .delete(`/todolist/${await lastPkTodo() - 1}`)
            .set('Authorization','dsd')

        expect(response.status).toBe(401);
        expect(response.body.message).toMatch(/unauthorized/i);
    });

    test('delete fail, with no token',async ()=>{
        const response  = await supertest(app)
            .delete(`/todolist/${await lastPkTodo() - 1}`)

        expect(response.status).toBe(401);
        expect(response.body.message).toMatch(/unauthorized/i);
    });

    test('delete fail, forbidden',async ()=>{
        const response  = await supertest(app)
            .put(`/todolist/${await lastPkTodo()}`)
            .set('Authorization',token)

        expect(response.status).toBe(403);
        expect(response.body.message).toMatch(/forbidden/i);
    });


});