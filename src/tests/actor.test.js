const request = require("supertest");
const app = require("../app");
require("../models");

let actorId;

test("POST /actors should create an actor", async () => {
  const newActor = {
    firstName: "actor",
    lastName: "bot",
    nationality: "argentina",
    image: "imagen",
    birthday: "1994/01/22",
  };
  const res = await request(app).post("/actors").send(newActor);
  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(newActor.firstName);
});

test("GET /actors should return all the actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("GET /actors should return one actor", async () => {
  const res = await request(app).get(`/actors/${actorId}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe("actor");
});

test("PUT /actors should update one actor", async () => {
  const body = {
    firstName: "Actor Update",
  };
  const res = await request(app).put(`/actors/${actorId}`).send(body);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(body.firstName);
});

test("DELETE /actors/:id should delte one actor", async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);
});
