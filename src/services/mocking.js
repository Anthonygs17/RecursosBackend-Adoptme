import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";

const generateUsers = async (count) => {
    const users = [];
    for (let i=0; i<count; i++) {
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: await createHash("coder123"),
            role: Math.random() > 0.5 ? "user" : "admin",
            pets: [],
        };
        users.push(user);
    }
    return users;
};

const generatePets = (count) => {
    const pets = [];
    for (let i=0; i<count; i++) {
        const pet = {
            name: faker.animal.petName(),
            specie: faker.animal.dog(),
            birthdate: faker.date.past(),
            adopted: false,
        };
        pets.push(pet);
    }
    return pets;
};

export { generateUsers, generatePets };