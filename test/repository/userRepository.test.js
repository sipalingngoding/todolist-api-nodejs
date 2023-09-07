import {describe, test, expect, beforeEach, afterEach} from "@jest/globals";

import userRepository from "../../src/repository/userRepository.js";

import {removeUserTest, insertUserTest, lastPk} from "../util-test.js";

const userRepositoryTest = new userRepository();

beforeEach(async ()=>{
    await removeUserTest();
    await insertUserTest();
});


const userNew = {email:'sinaga@gmail.com',password:'password',address :'Palembang',country :'Indonesia'};

describe("Test user Repository",()=>{
   test('Find All users',async ()=>{
        const users = await userRepositoryTest.findAll(['email','password','address','country']);
        expect(users).toHaveLength(2);
        expect(users[0]).toHaveProperty('email','diory@gmail.com');
        expect(users[0]).toHaveProperty('password');
        expect(users[0]).toHaveProperty('address','Bandung');
        expect(users[0]).toHaveProperty('country','Indonesia');

        expect(users[1]).toHaveProperty('email','pribadi@gmail.com');
        expect(users[1]).toHaveProperty('password');
        expect(users[1]).toHaveProperty('address','Jakarta');
        expect(users[1]).toHaveProperty('country','Indonesia');
   });

   test('Find User By PK',async ()=>{
       const lastId = await lastPk();
       const user =await userRepositoryTest.findByPk(lastId);
       expect(user).not.toBeNull();
       expect(user).toHaveProperty('email','pribadi@gmail.com');
   });

   test('Find User Not Found By Pk',async ()=>{
        const lastId = await lastPk()+ 1;
        const user = await userRepositoryTest.findByPk(lastId);
        expect(user).toBeNull();
   });

   test('Find User By email',async ()=>{
        const user= await userRepositoryTest.findOne(['email','diory@gmail.com']);
        expect(user).not.toBeNull();
        expect(user).toHaveProperty('address','Bandung');
        expect(user).toHaveProperty('email','diory@gmail.com');
        expect(user).toHaveProperty('country','Indonesia');
   });

   test('Find User By address',async ()=>{
        const user = await userRepositoryTest.findOne(['address','Jakarta']);
        expect(user).not.toBeNull();
        expect(user).toHaveProperty('email','pribadi@gmail.com')
        expect(user).toHaveProperty('country','Indonesia');
   });

   test('Find User not found',async ()=>{
        const user = await userRepositoryTest.findOne(['email','notfound@gmail.com']);
        expect(user).toBeNull();
   });

   test('Insert User success',async ()=>{
       const id = await userRepositoryTest.insert(userNew);
       const lastId =await lastPk();
       expect(id).toBe(lastId);
       const users =await userRepositoryTest.findAll();
       expect(users).toHaveLength(3);
       expect(users[2]).toHaveProperty('email','sinaga@gmail.com');
   })
});
