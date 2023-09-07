import validate from "../../src/validator/validate.js";
import {userRegisterSchema} from "../../src/validator/user.js";
import {describe, expect, test} from "@jest/globals";

const userNew = {email :'diory@gmail.com',password : 'Diory123?!', address :'Bandung',country : 'Indonesia'};

describe('Test validate User',()=>{
    test('Test validate user register schema with no error',()=>{
        expect(validate(userRegisterSchema(),userNew)).toEqual(userNew);
    });

    test('Test validate user register schema with error ',()=>{
        expect(()=>{
                validate(userRegisterSchema(),{...userNew,password: '12345'})
        }).toThrow();
    });
});
