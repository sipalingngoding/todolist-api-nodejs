import {beforeEach, describe, expect, test} from "@jest/globals";
import todolistService from "../../src/service/todoListService.js";
import {insertTodoTest, insertUserTest, lastPk, lastPkTodo, removeTodoTest, removeUserTest} from "../util-test.js";

const todolistServiceTest = new todolistService();

beforeEach(async ()=>{
    await removeUserTest();
    await removeTodoTest();
    await insertUserTest();
    await insertTodoTest();
});

describe("Test Todolist Service",()=>{
    test('Get All Todolist with userId',async ()=>{
        const todolist = await todolistServiceTest.getAll(await lastPk());
        expect(todolist).toHaveLength(1);
        expect(todolist[0]).toHaveProperty('User');
        expect(todolist[0]).toHaveProperty('todo','Belajar PHP');
        expect(todolist[0]).toHaveProperty('userId',await lastPk());
        expect(todolist[0].User).toHaveProperty('email','pribadi@gmail.com');
    });

    test('Get Todolist success',async()=>{
        const todo = await todolistServiceTest.getOneByPk(await lastPkTodo());
        expect(todo).not.toBeNull();
        expect(todo).toHaveProperty('todo','Belajar PHP');
        expect(todo).toHaveProperty('userId',await lastPk());
    });

    test('Get Todolist fail, not found',async ()=>{
        try {
            await todolistServiceTest.getOneByPk(await lastPkTodo()+1);
        }catch (err)
        {
            expect(err.message).toBe('todo not found');
        }
    });

    test('Get todolist Find One',async ()=>{
        const todo = await todolistServiceTest.getOne(['userId',await lastPk()]);
        expect(todo).not.toBeNull();
        expect(todo).toHaveProperty('todo','Belajar PHP')
    });

    test('Get todolist Find One, not found',async ()=>{
        try {
            await todolistServiceTest.getOne(['userId',await lastPk()+1]);
        }catch (err) {
            expect(err.message).toBe('todo not found');
        }
    });

    test('Insert Todo success',async ()=>{
        const id = await todolistServiceTest.add({userId : await lastPk(),todo : 'Belajar Golang'});
        expect(id).toBe(await lastPkTodo());
        const todolist = await todolistServiceTest.getAll(await lastPk());
        expect(todolist).toHaveLength(2);
        expect(todolist[1]).toHaveProperty('todo','Belajar Golang');
        expect(todolist[1].User).toHaveProperty('email','pribadi@gmail.com');
    });

    test('Insert Todo Fail, invalid input',async ()=>{
        try {
            await todolistServiceTest.add({userId : await lastPk(),todo :''})
        }catch (err)
        {
            expect(err.message).not.toBe('');
        }
    });

    test('Update todo success',async ()=>{
        expect(await todolistServiceTest.update({id: await lastPkTodo(),todo :'Belajar Golang'})).toBeTruthy();
        const todo = await todolistServiceTest.getOneByPk(await lastPkTodo());
        expect(todo).toHaveProperty('todo','Belajar Golang');
    });

    test('Update todo fail, invalid input',async ()=>{
        try {
            await todolistServiceTest.update({id : await lastPkTodo(),todo :''})
        }catch (err)
        {
            expect(err.message).not.toBe('');
        }
    });

    test('Delete todo success',async ()=>{
        expect(await todolistServiceTest.delete(await lastPkTodo())).toBeTruthy();
        const todoList = await todolistServiceTest.getAll(await lastPk());
        expect(todoList).toHaveLength(0);
    });

    test('Delete todo fail, todo not found',async ()=>{
        try {
            await todolistServiceTest.delete(await lastPkTodo()+1);
        }catch (err)
        {
            expect(err.message).toBe('todo not found');
        }
    });

});