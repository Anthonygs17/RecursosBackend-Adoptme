import supertest from "supertest";
import { expect } from "chai";
const requester = supertest("http://localhost:8080");

describe("Testing de adopciones", () => {
    let userId, petId, adoptionId;
    before(async () => {
        await requester.post("/api/mocks/generateData?users=2&pets=2");
        const { body: { payload: users }} = await requester.get("/api/users");
        const { body: { payload: pets }} = await requester.get("/api/pets");
        userId = users[users.length - 1]._id;
        petId = pets[pets.length - 1]._id;

        await requester.post(`/api/adoptions/${users[users.length-2]._id}/${pets[pets.length-2]._id}`);
        const {body: {payload: adoptions}} = await requester.get('/api/adoptions');
        adoptionId = adoptions[adoptions.length - 1]._id;
    });
    
    it("Endpoint GET /api/adoptions debe traer todas las mascotas", async () => {
        const response = await requester.get("/api/adoptions");
        expect(response.status).to.equal(200);
        expect(response.body.payload).to.be.an("array");
    });
    it("Endpoint GET /api/adoptions/:aid debe traer una sola adopcion", async () => {
        const response = await requester.get(`/api/adoptions/${adoptionId}`);
        expect(response.status).to.equal(200);
        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload).to.have.property("_id").that.equals(adoptionId);
    });
    it("Endpoint GET /api/adoptions/:aid debe devolver un error si la adopcion no existe", async () => {
        let fakeAdoptionId = "67c123456789101112131415";
        const response = await requester.get(`/api/adoptions/${fakeAdoptionId}`);
        expect(response.status).to.equal(404);
        expect(response.body).to.have.property("error").that.equals("Adoption not found");
    });
    it("Endpoint POST /api/adoptions/:uid/:pid debe crear una adopcion", async () => {
        const response = await requester.post(`/api/adoptions/${userId}/${petId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message").that.equals("Pet adopted");
    });
    it("Endpoint POST /api/adoptions/:uid/:pid debe devolver un error si la mascota ya fue adoptada", async () => {
        const response = await requester.post(`/api/adoptions/${userId}/${petId}`);
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error").that.equals("Pet is already adopted");
    });
});
