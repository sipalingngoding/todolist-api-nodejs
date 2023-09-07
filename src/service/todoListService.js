import todolistRepository from "../repository/todolistRepository.js";
import NotFoundError from "../error/notFoundError.js";
import validate from "../validator/validate.js";
import {addTodoSchema} from "../validator/todo.js";
class todolistService
{
    #todolistRepository;
    constructor() {
        this.#todolistRepository = new todolistRepository();
    }

    async getAll(userId, attributes = ['id','todo','userId']){
        return await this.#todolistRepository.findAll(userId,attributes);
    }

    async getOneByPk(pk){
        const todo =  await this.#todolistRepository.findByPk(pk);
        if(!todo) throw new NotFoundError('todo not found');
        return todo;
    }

    async getOne(data){
        const todo =  await this.#todolistRepository.findByOne(data);
        if(!todo) throw new NotFoundError('todo not found');
        return todo;
    }

    async add({userId, todo}){
        validate(addTodoSchema(),{todo});
        return await this.#todolistRepository.insert({userId,todo});
    }

    async update({id,todo}){
        const todoUpdate = await this.#todolistRepository.findByPk(id);
        if(!todoUpdate) throw new NotFoundError('todo not found');
        if(todo !== null) validate(addTodoSchema(),{todo});
        else todo = todoUpdate.todo;
        await this.#todolistRepository.update({id,todo});
        return true;
    }

    async delete(id){
        const todo = await this.#todolistRepository.findByPk(id);
        if(!todo) throw new NotFoundError('todo not found');
        return await this.#todolistRepository.delete(id);
    }
}

export default todolistService;