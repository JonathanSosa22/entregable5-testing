const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

let movieId;

test("POST /movies should create an movie", async () => {
  const newMovie = {
    name: "movie",
    image: "imagen",
    synopsis: "synopsis",
    releaseYear: "1994/01/22",
  };
  const res = await request(app).post("/movies").send(newMovie);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newMovie.name);
});

test("GET /movies should return all the movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].genres).toBeDefined();
});

test("GET /movies should return one movie", async () => {
  const res = await request(app).get(`/movies/${movieId}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe("movie");
});

test("PUT /movies should update one movie", async () => {
  const body = {
    name: "Movie Update",
  };
  const res = await request(app).put(`/movies/${movieId}`).send(body);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
});

test("POST /movies/:id/actors should set the movie actor", async () => {
  const actor = await Actor.create({
    firstName: "actor",
    lastName: "bot",
    nationality: "argentina",
    image: "imagen",
    birthday: "1994/01/22",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors should set the movie director", async () => {
  const director = await Director.create({
    firstName: "director",
    lastName: "bot",
    nationality: "argentina",
    image: "imagen",
    birthday: "1994/01/22",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/genres should set the movie genres", async () => {
  const genres = await Genre.create({
    name: "genre",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genres.id]);
  await genres.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE /movies/:id should delte one movie", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});
