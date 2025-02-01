import { generateUsers, generatePets } from "../services/mocking.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

const getMockingUsers = async(req, res) => {
    const num = parseInt(req.query.num) || 50;
    const users = await generateUsers(num);
    res.send({status: "success", payload: users});
};

const getMockingPets = async(req, res) => {
    const num = parseInt(req.query.num) || 100;
    const pets = await generatePets(num);
    res.send({status: "success", payload: pets});
};

const generateData = async(req, res) => {
    const numUsers = parseInt(req.query.users) || 50;
    const numPets = parseInt(req.query.pets) || 100;
    const users = await generateUsers(numUsers);
    const pets = await generatePets(numPets);
    await userModel.insertMany(users);
    await petModel.insertMany(pets);
    res.send({status: "success", payload: {users, pets}});
};

export default {
    getMockingUsers,
    getMockingPets,
    generateData
};