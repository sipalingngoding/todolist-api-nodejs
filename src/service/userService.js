import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import ClientError from '../error/clientError.js';
import userRepository from '../repository/userRepository.js';
import validate from '../validator/validate.js';
import {userLoginSchema, userRegisterSchema} from '../validator/user.js';

class userService{
    #userRepository
    constructor() {
        this.#userRepository = new userRepository();
    }

    async register({email,password,address,country}){
        validate(userRegisterSchema(),{email,password,address,country})
        const user = await this.#userRepository.findOne(['email',email]);
        if(user) throw new ClientError('email already exist');

        return this.#userRepository.insert({email, password : await bcrypt.hash(password,10),address,country})
    }

    async login({email,password}){
        validate(userLoginSchema(),{email,password});
        const user  = await this.#userRepository.findOne(['email',email]);
        if(!user) throw new ClientError('email or password is wrong');
        const comparePw = await bcrypt.compare(password,user.password);
        if(!comparePw) throw new ClientError('email or password is wrong');
        return jwt.sign({id : user.id},process.env.SECRET_KEY,{expiresIn: '1h'})
    }


}

export default userService;
