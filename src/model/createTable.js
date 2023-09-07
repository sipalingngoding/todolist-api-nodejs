import User from "./user.js";
import Todolist from "./todolist.js";


(async ()=>{
    await User.sync();
    await Todolist.sync();
})();

console.log('Table Users has created');
console.log('Table Todolists has created');
