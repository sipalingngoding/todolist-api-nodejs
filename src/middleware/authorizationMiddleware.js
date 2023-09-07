import todolistRepository from "../repository/todolistRepository.js";

const TodolistRepository = new todolistRepository();
const authorization = async (req,res,next)=>{
    const userId = req.user.id;
    const todoId = req.params.id;
    const todo = await TodolistRepository.findByPk(todoId);

    if(!todo){
        next();
        return ;
    }
    if(todo.userId !== userId){
        return res.status(403).json({
            status : 'fail',
            message : 'forbidden',
        });
    }
    next();
}

export default authorization;