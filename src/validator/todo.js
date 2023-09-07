import Joi from "joi";

const addTodoSchema =()=>{
    return Joi.object({
        todo : Joi.string().min(10).required(),
    });
}

export {
    addTodoSchema,
}