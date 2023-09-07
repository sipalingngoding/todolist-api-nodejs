import sequelize from "../database/connection.js";
import {DataTypes, Model} from "sequelize";

class User extends Model{}

User.init({
    id : {
        type: DataTypes.INTEGER,
        autoIncrement :true,
        primaryKey:true,
    },
    email : {
        type :DataTypes.STRING,
        allowNull : false,
    },
    password: {
        type :DataTypes.STRING,
        allowNull : false
    }
    ,
    address : {
        type :DataTypes.STRING,
        allowNull:  false,
    },
    country : {
        type :DataTypes.STRING,
        allowNull  : false,
    },
},{
    sequelize,
    modelName : 'User',
})


export default User;
