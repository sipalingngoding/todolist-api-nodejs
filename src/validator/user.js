import Joi from "joi";

const userRegisterSchema = () =>{
    return Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
        address: Joi.string().min(5).required(),
        country: Joi.string().required(),
    });
}

const userLoginSchema = ()=>{
    return Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().required()
    });
}

export {
    userRegisterSchema, userLoginSchema
}
