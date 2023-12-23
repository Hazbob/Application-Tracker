import request from "supertest";
import app from "../src/server";
import { generateJWTForTest } from "../src/utils/testUtils";
import prisma from "../src/db";
let testToken = "";
let testProductId;
beforeEach(async () => {
  await prisma.application.deleteMany({});
  await prisma.user.deleteMany({});
  testToken = await generateJWTForTest();
});

/*
 *Unit Tests for input validators
 * */

describe("POST /API/APP", () => {
  /*
   *
   * job title validation*/
  it("should return an error if the request body is empty", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({})
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);
    expect(res.body.errors[0].msg).toBe("Request body cannot be empty");
  });
  it("should return an error if the jobTitle is missing", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        companyName: "mockCompanyName",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);
    expect(res.body.errors[0].msg).toBe("Invalid value");
  });
  it("should return an error if the jobTitle is an empty string", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        jobTitle: "",
        companyName: "mockCompanyName",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);
    expect(res.body.errors[0].msg).toBe("Invalid job title");
  });
  it("should return an error if the jobTitle isnt a string", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        jobTitle: 1,
        companyName: "mockCompanyName",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);
    expect(res.body.errors[0].msg).toBe("Invalid value");
  });
  /*
   *
   * company name validation*/
  it("should return an error if the companyName is missing", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        jobTitle: "mock title",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);
    expect(res.body.errors[0].msg).toBe("Invalid value");
  });
  it("should return an error if the companyName is an empty string", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        jobTitle: "mockTitle",
        companyName: "",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);
    expect(res.body.errors[0].msg).toBe("Invalid company name");
  });
  it("should return an error if the companyName isnt a string", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        jobTitle: "mockTitle",
        companyName: 1,
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);
    expect(res.body.errors[0].msg).toBe("Invalid value");
  });
  /*
   *
   * STATUS validation*/
  it("should not throw an error if the status is left out", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        jobTitle: "mockTitle",
        companyName: "mockCompany",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);
    expect(res.body.data).toMatchObject({
      id: expect.any(String),
      createdAt: expect.any(String),
      jobTitle: "mockTitle",
      companyName: "mockCompany",
      status: "APPLIED",
      imageUrl: null,
      notes: null,
      appliedDate: expect.any(String),
      contactDetails: null,
      userId: expect.any(String),
    });
  });
  it("should return an error if a status is input not in the allowed statuses", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        jobTitle: "mockTitle",
        companyName: "mockCompany",
        status: "notavalidstatus",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);
    expect(res.body.errors[0].msg).toBe("Invalid status");
  });
  it("should not throw an error if a valid input is input and return an object with that input", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        jobTitle: "mockTitle",
        companyName: "mockCompany",
        status: "INTERVIEW_SCHEDULED",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);
    expect(res.body.data).toMatchObject({
      id: expect.any(String),
      createdAt: expect.any(String),
      jobTitle: "mockTitle",
      companyName: "mockCompany",
      status: "INTERVIEW_SCHEDULED",
      imageUrl: null,
      notes: null,
      appliedDate: expect.any(String),
      contactDetails: null,
      userId: expect.any(String),
    });
  });

  /*
   *
   * contactDetails validation*/
  it("should not throw an error if contact details is left out", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        jobTitle: "mockTitle",
        companyName: "mockCompany",
        status: "INTERVIEW_SCHEDULED",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);
  });
  it("should not throw an error if contact details is left out", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        jobTitle: "mockTitle",
        companyName: "mockCompany",
        status: "INTERVIEW_SCHEDULED",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);
  });
  it("should not throw an error if contact details is valid", async () => {
    const res = await request(app)
      .post("/api/app")
      .send({
        jobTitle: "mockTitle",
        companyName: "mockCompany",
        status: "INTERVIEW_SCHEDULED",
        contactDetails: "email on mock@email.com",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);
  });
});
/*
 *
 * PUT REQUEST VALIDATORS*/

describe("PUT /api/app", () => {
  it("should throw an error if the property doesnt exist ", async () => {
    const res = await request(app)
      .put("/api/app/123")
      .send({ nonExistentProperty: "Software Engineer" })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);
  });

  it("should return an error if jobTitle is not a string", async () => {
    const res = await request(app)
      .put("/api/app/123")
      .send({ jobTitle: 123 })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);

    expect(res.body.errors[0].msg).toBe("Invalid job title");
  });
  it("should return an error if companyName is not a string", async () => {
    const res = await request(app)
      .put("/api/app/123")
      .send({ companyName: 123 })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);

    expect(res.body.errors[0].msg).toBe("Invalid company name");
  });
  it("should return an error if status is not valid", async () => {
    const res = await request(app)
      .put("/api/app/123")
      .send({ status: 123 })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);

    expect(res.body.errors[0].msg).toBe("Invalid status");
  });
  it("should return an error if contactDetails is not valid", async () => {
    const res = await request(app)
      .put("/api/app/123")
      .send({ contactDetails: 123 })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);

    expect(res.body.errors[0].msg).toBe("Invalid contact details");
  });
  it("should return an error if imageUrl is not valid", async () => {
    const res = await request(app)
      .put("/api/app/123")
      .send({ imageUrl: 123 })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);

    expect(res.body.errors[0].msg).toBe("Invalid image URL");
  });
  it("should return an error if appliedDate is not valid", async () => {
    const res = await request(app)
      .put("/api/app/123")
      .send({ appliedDate: 123 })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(400);
    expect(res.body.errors[0].msg).toBe("Invalid applied date");
  });
});
