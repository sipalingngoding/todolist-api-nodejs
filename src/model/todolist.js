import sequelize from "../database/connection.js";
import {DataTypes, Model} from "sequelize";

class Todolist extends Model{}

Todolist.init({
    id : {
        type: DataTypes.INTEGER,
        autoIncrement :true,
        primaryKey:true,
    },
    todo : {
        type :DataTypes.STRING,
        allowNull : false,
    },
    userId : {
        type : DataTypes.INTEGER,
    }
},{
    sequelize,
    modelName : 'Todolist',
})


export default Todolist;
