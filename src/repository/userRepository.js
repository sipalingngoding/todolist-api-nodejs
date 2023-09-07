import User from "../model/user.js";

class userRepository{
    #User
    constructor() {
        this.#User = User;
    }

     async findAll(attributes = ['id','email','password','address','country']){
        return await this.#User.findAll({
            attributes: [...attributes],
        });
    }


    async findByPk(pk){
        return await this.#User.findByPk(pk);
    }

    async findOne(data){
        return await this.#User.findOne({
            where:{
                [data[0]] : data[1],
            },
        })
    }

    async insert({email,password,address,country}){
        const userNew = await this.#User.create({email,password,address,country});
        return userNew.id;
    }
}

export default userRepository;
