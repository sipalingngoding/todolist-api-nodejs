import Todolist from "../model/todolist.js";
import User from "../model/user.js";

User.hasMany(Todolist,{
    foreignKey : 'userId',
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
});

Todolist.belongsTo(User,{
    foreignKey : 'userId',
});

class todolistRepository
{
    #Todolist;
    constructor() {
        this.#Todolist = Todolist;
    }

    async findAll(userId,attributes = ['id','todo','userId']){
        return await Todolist.findAll({
            where : {
                userId
            },
            attributes : [...attributes],
            include : {
                model : User, attributes :['id','email','address','country'],
            },
        });
    }

    async findByPk(pk){
        return await this.#Todolist.findByPk(pk);
    }

    async findByOne(data){
        return await this.#Todolist.findOne({
            where : {
                [data[0]] : data[1],
            },
        })
    }

    async insert({userId, todo}){
        const user = await this.#Todolist.create({todo,userId});
        return user.id;
    };

    async update({id, todo}){
        await this.#Todolist.update({todo},{
            where : {
                id,
            },
        });
        return true;
    };

    async delete(id){
        await this.#Todolist.destroy({
            where :{
                id,
            },
        });
        return true;
    }

}

export default todolistRepository;