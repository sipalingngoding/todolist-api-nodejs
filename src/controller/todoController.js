import todolistService from "../service/todoListService.js";

const TodoService = new todolistService();
class todoController{
    static async getAll(req,res,next){
        try{
            const todolist = await TodoService.getAll(req.user.id);
            return res.json({
                status :'success',
                data : {
                    todolist,
                },
            })
        }catch (err)
        {
            next(err);
        }
    }

    static async add(req,res,next){
        try {
            const id = await TodoService.add({userId : req.user.id,todo : req.body.todo});
            return res.status(201).json({
                status :'success',
                message :'add todo success',
                data :{
                    id,
                },
            });
        }catch (err){
            next(err);
        }
    }

    static async update(req,res,next){
        try{
            await TodoService.update({id:req.params.id,todo : req.body.todo ??  null});
            return res.json({
                status :'success',
                message :'update todo success',
            });
        }catch (err)
        {
            next(err);
        }
    }

    static async delete(req,res,next){
        try{
            await TodoService.delete(req.params.id);
            return res.json({
                status :'success',
                message :'delete todo success',
            });
        }catch (err){
            next(err);
        }
    }
}

export default todoController;