const request = require("supertest");
const app = require("../app");
require("../models");

let directorId;

test("POST /directors should create an director", async () => {
  const newDirector = {
    firstName: "director",
    lastName: "bot",
    nationality: "argentina",
    image: "imagen",
    birthday: "1994/01/22",
  };
  const res = await request(app).post("/directors").send(newDirector);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(newDirector.firstName);
});

test("GET /directors should return all the directors", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("GET /directors should return one director", async () => {
  const res = await request(app).get(`/directors/${directorId}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe("director");
});

test("PUT /directors should update one director", async () => {
  const body = {
    firstName: "Director Update",
  };
  const res = await request(app).put(`/directors/${directorId}`).send(body);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(body.firstName);
});

test("DELETE /directors/:id should delte one director", async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);
});
