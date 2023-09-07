import ClientError from "../error/clientError.js";

const validate = (schema,input) =>{
    const {error, value} = schema.validate(input);
    if(error) {
        throw new ClientError(error.message);
    }
    return value;
}

export default validate;
