import {beforeEach, describe, expect, test} from "@jest/globals";
import {insertTodoTest, insertUserTest, lastPk, lastPkTodo, removeTodoTest, removeUserTest} from "../util-test.js";
import todolistRepository from "../../src/repository/todolistRepository.js";

const todoListRepositoryTest = new todolistRepository();

beforeEach(async ()=>{
    await removeUserTest();
    await removeTodoTest();
    await insertUserTest();
    await insertTodoTest();
})

describe('Test Todolist Repository',()=>{
    test('Find All Todolists',async ()=>{
        const todolist = await todoListRepositoryTest.findAll(await lastPk()-1);
        expect(todolist).toHaveLength(1);
        expect(todolist[0]).toHaveProperty('todo','Belajar Node Js')
        expect(todolist[0]).toHaveProperty('userId',await lastPk()-1)
        expect(todolist[0]).toHaveProperty('User');
        expect(todolist[0].User).toHaveProperty('email','diory@gmail.com');
    });

    test('Find Todo success, By Pk',async ()=>{
        const todo = await todoListRepositoryTest.findByPk(await lastPkTodo());
        expect(todo).not.toBeNull();

        expect(todo).toHaveProperty('userId',await lastPk());
        expect(todo).toHaveProperty('todo','Belajar PHP')
    });

    test('Find Todo not found By Pk',async ()=>{
        const todo = await todoListRepositoryTest.findByPk(await lastPkTodo()+1);
        expect(todo).toBeNull();
    });

    test('Find Todo success, By userId',async ()=>{
        const todo = await todoListRepositoryTest.findByOne(['userId',await lastPk()]);
        expect(todo).not.toBeNull();
        expect(todo).toHaveProperty('todo','Belajar PHP');
    });

    test('Find Todo not found, By userId',async ()=>{
        const todo = await todoListRepositoryTest.findByOne(['userId',await lastPk()+1]);
        expect(todo).toBeNull();
    });

    test('INSERT Todo success',async ()=>{
        const id = await todoListRepositoryTest.insert({userId : await lastPk(),todo : 'Belajar Golang'});
        expect(id).toBe(await lastPkTodo());
        const todoLists = await todoListRepositoryTest.findAll(await lastPk());
        expect(todoLists).toHaveLength(2);
    });

    test('UPDATE Todo Success',async ()=>{
        const todo = await todoListRepositoryTest.update({id: await lastPkTodo(),todo : 'Belajar Golang'});
        expect(todo).not.toBeNull();
        expect(todo).toBeTruthy();
        const lastTodo = await todoListRepositoryTest.findByPk(await lastPkTodo());
        expect(lastTodo).toHaveProperty('todo','Belajar Golang');
    });

    test('DELETE Todo Success',async ()=>{
        const lastPk = await lastPkTodo();
        expect(await todoListRepositoryTest.delete(lastPk)).toBeTruthy();
        expect(await lastPkTodo()).not.toBe(lastPk);
        expect(await lastPkTodo()).toBe(lastPk - 1);
    });

});