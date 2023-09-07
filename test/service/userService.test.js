import dotenv from 'dotenv';

import userService from "../../src/service/userService.js";
import {beforeEach, describe, expect, test} from "@jest/globals";
import {insertUserTest, lastPk, removeUserTest} from "../util-test.js";

dotenv.config();

const userServiceTest = new userService();

beforeEach(async ()=>{
    await removeUserTest();
    await insertUserTest();
});

const userNew = {email :'admin@gmail.com',password : 'Diory123?!', address :'Bandung',country : 'Indonesia'};

describe('Test user Service ',()=>{
    test('Test Register User Success',async ()=>{
        const id  = await userServiceTest.register(userNew);
        const lastId = await lastPk();
        expect(id).toBe(lastId);
    });

    test('Test Register User fail, email already exist',async ()=>{
        await userServiceTest.register(userNew);

        try {
            await userServiceTest.register(userNew);
        }catch (err)
        {
            expect(err.message).toMatch(/email already exist/i)
        }
    });

    test('Test Register User Fail, with invalid input',async ()=>{
        try{
            await userServiceTest.register({...userNew,password:'123'})
        }catch (err)
        {
            expect(err.message).not.toBe('');
        }
    });


    test('User Login Success',async ()=>{
        const token = await userServiceTest.login({email:'diory@gmail.com',password:'password'});
        expect(token).not.toBeUndefined();
        expect(token).not.toBe('')
    });

    test('User Login fail, email not found',async ()=>{
        try{
            await userServiceTest.login({email:'admin@gmail.com',password:'123'});
        }catch (err)
        {
            expect(err.message).toMatch(/email or password is wrong/i);
        }
    });

    test('User Login fail, password is wrong',async ()=>{
        try{
            await userServiceTest.login({email:'diory@gmail.com',password:'wrong'});
        }catch (err)
        {
            expect(err.message).toMatch(/email or password is wrong/i);
        }
    });
});
