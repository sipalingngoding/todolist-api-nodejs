import User from "../src/model/user.js";
import Todolist from "../src/model/todolist.js";
import bcrypt from "bcrypt";

const insertUserTest = async ()=>{
    await User.create({
        email :'diory@gmail.com',password : await bcrypt.hash('password',10), address :'Bandung',country : 'Indonesia'
    });
    await User.create({
        email :'pribadi@gmail.com',password : await bcrypt.hash('password',10), address :'Jakarta',country : 'Indonesia'
    })
}

const removeUserTest = async ()=>{
    await User.destroy({
        truncate : true,
        cascade : true,
    })
};

const lastPk = async () =>{
    const users = await User.findAll({order :[['id','DESC']]});
    return users[0].id;
};

const insertTodoTest = async ()=>{
    await Todolist.create({todo :'Belajar Node Js',userId :await lastPk()-1})
    await Todolist.create({todo :'Belajar PHP',userId :await lastPk()})
};

const removeTodoTest = async ()=>{
    await Todolist.destroy({
        truncate : true,
    });
}

const lastPkTodo =async ()=>{
    const todolist = await Todolist.findAll({order : [['id','DESC']]})
    return todolist[0].id;
}

export {
    insertUserTest, removeUserTest, lastPk, insertTodoTest, removeTodoTest, lastPkTodo,
}
