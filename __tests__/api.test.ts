import request from "supertest";
import app from "../src/server";
import prisma from "../src/db";
import seed from "../prisma/seed";
const validStatuses = [
  "APPLIED",
  "INTERVIEW_SCHEDULED",
  "INTERVIEW_COMPLETED",
  "SKILL_ASSESSMENT",
  "OFFER_ACCEPTED",
  "OFFER_DECLINED",
  "WITHDRAWN",
];
let applicationId: string;
let testToken: string;
beforeEach(async () => {
  await prisma.application.deleteMany({});
  await prisma.user.deleteMany({});
  const seedData = await seed();
  applicationId = seedData.applicationId;
  testToken = seedData.testToken;

  // testToken = await generateJWTForTest();
});

describe("POST applications", () => {
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

  it.each(validStatuses)(
    "should not throw an error if a valid input for status",
    async (status) => {
      const res = await request(app)
        .post("/api/app")
        .send({
          jobTitle: "mockTitle",
          companyName: "mockCompany",
          status: status,
        })
        .set("Authorization", `Bearer ${testToken}`)
        .expect(201);
      expect(res.body.data).toMatchObject({
        id: expect.any(String),
        createdAt: expect.any(String),
        jobTitle: "mockTitle",
        companyName: "mockCompany",
        status: status,
        imageUrl: null,
        notes: null,
        appliedDate: expect.any(String),
        contactDetails: null,
        userId: expect.any(String),
      });
    },
  );

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
        contactDetails: "mock@email.com",
      })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(201);
  });
});
/*
PUT applications
 */

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
  it("should response with 200 for successful update and return the update application ", async () => {
    const res = await request(app)
      .put(`/api/app/${applicationId}`)
      .send({ appliedDate: "23/12/2023" })
      .set("Authorization", `Bearer ${testToken}`)
      .expect(200);
    expect(res.body.data).toMatchObject({
      jobTitle: "mockApp",
      companyName: "mockCompany",
      status: "APPLIED",
      imageUrl: null,
      appliedDate: "2023-12-23T00:00:00.000Z", // this is the update property
      contactDetails: null,
    });
  });
  it.each(validStatuses)(
    "should respond with 200 for updating to a valid status and update the database to represent this ",
    async (status) => {
      const res = await request(app)
        .put(`/api/app/${applicationId}`)
        .send({ status: status })
        .set("Authorization", `Bearer ${testToken}`)
        .expect(200);
      expect(res.body.data).toMatchObject({
        jobTitle: "mockApp",
        companyName: "mockCompany",
        status: status,
        imageUrl: null,
        appliedDate: expect.any(String), // this is the update property
        contactDetails: null,
      });
      const updatedApp = await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
        select: {
          status: true,
        },
      });
      expect(updatedApp.status).toBe(status); // checks the database has updated the info
    },
  );
  const validChanges = [
    { jobTitle: "changedJobTitle" },
    { companyName: "changedCompanyName" },
    { contactDetails: "email: change@email.com" },
    { imageUrl: "changedImageURL" },
  ];
  it.each(validChanges)(
    "should respond with 200 for updating valid properties ",
    async (change) => {
      const res = await request(app)
        .put(`/api/app/${applicationId}`)
        .send(change)
        .set("Authorization", `Bearer ${testToken}`)
        .expect(200);

      console.log(res.body.data);
      expect(res.body.data).toMatchObject({
        jobTitle: "mockApp",
        companyName: "mockCompany",
        status: "APPLIED",
        imageUrl: null,
        appliedDate: expect.any(String), // this is the update property
        contactDetails: null,
        ...change,
      });
      const updatedApp = await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
        select: {
          status: true,
          jobTitle: true,
          companyName: true,
          contactDetails: true,
          imageUrl: true,
        },
      });
      const [key, value] = Object.entries(change)[0];
      expect(updatedApp[key]).toBe(value); // checks the database has updated the info
    },
  );
});
