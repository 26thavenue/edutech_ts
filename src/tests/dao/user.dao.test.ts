import UserDAO from '../../dao/user.dao';
import { expect, test } from "bun:test";
import {User} from '@prisma/client'


const userDAO = new UserDAO();


//GET ALL USERS
test("getAllUsers", async () => {
  const users = await userDAO.getAllUsers();
  expect(users).toBeArray();
});


//GET USER BY ID

test("getUserById", async () => {
  const user = await userDAO.getUserById("1");
  console.log(user)
  expect(user).toBeObject();
})



//GET USER BY ID -DO NOT EXIST

test("getUserById", async () => {
  const user = await userDAO.getUserById("2");
  console.log(user)
  expect(user).toBeUndefined();
})



//CREATE USER
test("createUser", async () => {
    
    const user = {
        email: "temitopeoni@gmail.com",
        name: "Temitope Oni",
        passwordHash: "password",
    }


    const data = await userDAO.createUser(user.name, user.passwordHash, user.email)
    expect(data).toBeObject();

}
)