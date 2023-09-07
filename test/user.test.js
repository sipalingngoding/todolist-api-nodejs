import supertest from 'supertest';
import dotenv from 'dotenv';
import {beforeEach, describe, expect, test} from "@jest/globals";
import app from "../src/app/index.js";
import {insertUserTest, lastPk, removeUserTest} from "./util-test.js";

dotenv.config();

const userNew = {email :'admin@gmail.com',password : 'Diory123?!', address :'Bandung',country : 'Indonesia'};

beforeEach(async ()=>{
    await removeUserTest();
    await insertUserTest();
})

describe('POST /users/register',()=>{
    test('Register Success',async ()=>{
        const response = await supertest(app)
            .post('/users/register')
            .set('Accept','application/json')
            .send(userNew);
        expect(response.status).toBe(201);
        expect(response.body.message).toMatch(/register user success/i);
        const lastId = await lastPk();
        expect(response.body.data.id).toBe(lastId);
    });

    test('Register Fail, email already exist',async ()=>{
        const response = await supertest(app)
            .post('/users/register')
            .set('Accept','application/json')
            .send({...userNew,email:'diory@gmail.com'});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/email already exist/i);
    });

    test('Register fail, invalid input',async ()=>{
        const response = await supertest(app)
            .post('/users/register')
            .set('Accept','application/json')
            .send({...userNew,password:'dsds'});
        expect(response.status).toBe(400);
        expect(response.body.message).not.toBe('');
    });
});

describe('POST /users/login',()=>{
    test('Login success',async ()=>{
        const response = await supertest(app)
            .post('/users/login')
            .set('Accept','application/json')
            .send({email :'diory@gmail.com',password: 'password'});
        expect(response.status).toBe(200);
        const data = response.body.data;
        expect(data).toHaveProperty('token');
        expect(data.token).not.toBe('');
    });

    test('Login fail, email not found',async ()=>{
        const response = await supertest(app)
            .post('/users/login')
            .set('Accept','application/json')
            .send({email :'admin@gmail.com',password: 'password'});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/email or password is wrong/i)
    });

    test('Login fail, password wrong',async ()=>{
        const response = await supertest(app)
            .post('/users/login')
            .set('Accept','application/json')
            .send({email :'diory@gmail.com',password: 'wrong'});
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/email or password is wrong/i)
    });
});