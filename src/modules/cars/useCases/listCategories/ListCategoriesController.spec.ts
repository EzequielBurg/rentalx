import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List categories controller", async () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = "e7af58c1-38da-4599-af2f-2430d8022b59";

    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, is_admin, created_at)
      values('${id}', 'admin', 'admin@rentalx.com', '${password}', '123456', 'true', 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .get("/categories")
      .send({
        name: "Category supertest",
        description: "Category description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
