"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../src/server"));
var db_1 = __importDefault(require("../src/db"));
var seed_1 = __importDefault(require("../prisma/seed"));
var node_test_1 = require("node:test");
var validStatuses = [
    "APPLIED",
    "INTERVIEW_SCHEDULED",
    "INTERVIEW_COMPLETED",
    "SKILL_ASSESSMENT",
    "OFFER_ACCEPTED",
    "OFFER_DECLINED",
    "WITHDRAWN",
];
var applicationId;
var testToken;
var secondApplicationId;
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    var seedData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.application.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, db_1.default.user.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, seed_1.default)()];
            case 3:
                seedData = _a.sent();
                applicationId = seedData.applicationId;
                testToken = seedData.testToken;
                secondApplicationId = seedData.secondApplicationId;
                return [2 /*return*/];
        }
    });
}); });
(0, node_test_1.describe)("Unauthorised Checks - checks each protected endpoint for unauth response", function () {
    var endpoints = [
        { method: "get", endpoint: "/api/app" },
        { method: "post", endpoint: "/api/app" },
        { method: "put", endpoint: "/api/app/".concat(applicationId) },
        { method: "delete", endpoint: "/api/app".concat(applicationId) },
    ];
    it.each(endpoints)("should respond with status 401(unauthorised)", function (endpoint) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)[endpoint.method](endpoint.endpoint)
                        .set("Authorization", "Bearer dontexist")
                        .expect(401)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
(0, node_test_1.describe)("POST applications", function () {
    it("should return an error if the request body is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({})
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Request body cannot be empty");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if the jobTitle is missing", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        companyName: "mockCompanyName",
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid value");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if the jobTitle is an empty string", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        jobTitle: "",
                        companyName: "mockCompanyName",
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid job title");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if the jobTitle isnt a string", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        jobTitle: 1,
                        companyName: "mockCompanyName",
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid value");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if the companyName is missing", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        jobTitle: "mock title",
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid value");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if the companyName is an empty string", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        jobTitle: "mockTitle",
                        companyName: "",
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid company name");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if the companyName isnt a string", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        jobTitle: "mockTitle",
                        companyName: 1,
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid value");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not throw an error if the status is left out", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        jobTitle: "mockTitle",
                        companyName: "mockCompany",
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(201)];
                case 1:
                    res = _a.sent();
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
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if a status is input not in the allowed statuses", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        jobTitle: "mockTitle",
                        companyName: "mockCompany",
                        status: "notavalidstatus",
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid status");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not throw an error if a valid input is input and return an object with that input", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        jobTitle: "mockTitle",
                        companyName: "mockCompany",
                        status: "INTERVIEW_SCHEDULED",
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(201)];
                case 1:
                    res = _a.sent();
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
                    return [2 /*return*/];
            }
        });
    }); });
    it.each(validStatuses)("should not throw an error if a valid input for status", function (status) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        jobTitle: "mockTitle",
                        companyName: "mockCompany",
                        status: status,
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(201)];
                case 1:
                    res = _a.sent();
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
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not throw an error if contact details is left out", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        jobTitle: "mockTitle",
                        companyName: "mockCompany",
                        status: "INTERVIEW_SCHEDULED",
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(201)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not throw an error if contact details is valid", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .post("/api/app")
                        .send({
                        jobTitle: "mockTitle",
                        companyName: "mockCompany",
                        status: "INTERVIEW_SCHEDULED",
                        contactDetails: "mock@email.com",
                    })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(201)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
/*
PUT applications
 */
(0, node_test_1.describe)("PUT /api/app", function () {
    it("should throw an error if the property doesnt exist ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .put("/api/app/123")
                        .send({ nonExistentProperty: "Software Engineer" })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if jobTitle is not a string", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .put("/api/app/123")
                        .send({ jobTitle: 123 })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid job title");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if companyName is not a string", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .put("/api/app/123")
                        .send({ companyName: 123 })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid company name");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if status is not valid", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .put("/api/app/123")
                        .send({ status: 123 })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid status");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if contactDetails is not valid", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .put("/api/app/123")
                        .send({ contactDetails: 123 })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid contact details");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if imageUrl is not valid", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .put("/api/app/123")
                        .send({ imageUrl: 123 })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid image URL");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if appliedDate is not valid", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .put("/api/app/123")
                        .send({ appliedDate: 123 })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    expect(res.body.errors[0].msg).toBe("Invalid applied date");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should response with 200 for successful update and return the update application ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .put("/api/app/".concat(applicationId))
                        .send({ appliedDate: "23/12/2023" })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(200)];
                case 1:
                    res = _a.sent();
                    expect(res.body.data).toMatchObject({
                        jobTitle: "mockApp",
                        companyName: "mockCompany",
                        status: "APPLIED",
                        imageUrl: null,
                        appliedDate: "2023-12-23T00:00:00.000Z", // this is the update property
                        contactDetails: null,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it.each(validStatuses)("should respond with 200 for updating to a valid status and update the database to represent this ", function (status) { return __awaiter(void 0, void 0, void 0, function () {
        var res, updatedApp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .put("/api/app/".concat(applicationId))
                        .send({ status: status })
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(200)];
                case 1:
                    res = _a.sent();
                    expect(res.body.data).toMatchObject({
                        jobTitle: "mockApp",
                        companyName: "mockCompany",
                        status: status,
                        imageUrl: null,
                        appliedDate: expect.any(String), // this is the update property
                        contactDetails: null,
                    });
                    return [4 /*yield*/, db_1.default.application.findUnique({
                            where: {
                                id: applicationId,
                            },
                            select: {
                                status: true,
                            },
                        })];
                case 2:
                    updatedApp = _a.sent();
                    expect(updatedApp.status).toBe(status); // checks the database has updated the info
                    return [2 /*return*/];
            }
        });
    }); });
    var validChanges = [
        { jobTitle: "changedJobTitle" },
        { companyName: "changedCompanyName" },
        { contactDetails: "email: change@email.com" },
        { imageUrl: "changedImageURL" },
    ];
    it.each(validChanges)("should respond with 200 for updating valid properties ", function (change) { return __awaiter(void 0, void 0, void 0, function () {
        var res, updatedApp, _a, key, value;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .put("/api/app/".concat(applicationId))
                        .send(change)
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(200)];
                case 1:
                    res = _b.sent();
                    expect(res.body.data).toMatchObject(__assign({ jobTitle: "mockApp", companyName: "mockCompany", status: "APPLIED", imageUrl: null, appliedDate: expect.any(String), contactDetails: null }, change));
                    return [4 /*yield*/, db_1.default.application.findUnique({
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
                        })];
                case 2:
                    updatedApp = _b.sent();
                    _a = Object.entries(change)[0], key = _a[0], value = _a[1];
                    expect(updatedApp[key]).toBe(value); // checks the database has updated the info
                    return [2 /*return*/];
            }
        });
    }); });
    it("should throw an error if you try to edit an application that doesnt belong to the logged in user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .put("/api/app/".concat(secondApplicationId)) //this application doesnt belong to the user
                        .send({ companyName: "changingTheName" })
                        .set("Authorization", "Bearer ".concat(testToken)) // this is the test token to different user than owner
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
(0, node_test_1.describe)("GET /api/app - this should get all applications of the logged in user", function () {
    it("should get the applications of the logged in user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, application, userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .get("/api/app")
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(200)];
                case 1:
                    res = _a.sent();
                    expect(res.body.data.length).not.toBe(0);
                    return [4 /*yield*/, db_1.default.application.findFirst({
                            where: {
                                id: res.body.data[0].id,
                            },
                            select: {
                                userId: true,
                            },
                        })];
                case 2:
                    application = _a.sent();
                    return [4 /*yield*/, db_1.default.user.findUnique({
                            where: {
                                id: application.userId,
                            },
                            select: {
                                username: true,
                            },
                        })];
                case 3:
                    userId = _a.sent();
                    expect(userId.username).toBe("mockUser"); //usernames are unique so this is to check it belongs to the test user
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return error 404 and an error message saying no applications found if the user doesnt no applications exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //code to make sure there are no applications
                return [4 /*yield*/, db_1.default.application.deleteMany({})];
                case 1:
                    //code to make sure there are no applications
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                            .get("/api/app")
                            .set("Authorization", "Bearer ".concat(testToken))
                            .expect(404)];
                case 2:
                    res = _a.sent();
                    expect(res.body.message).toBe("No applications found");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should only return the applications belonging to the logged in user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, application, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .get("/api/app")
                        .set("Authorization", "Bearer ".concat(testToken))
                        .expect(200)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, db_1.default.application.findUnique({
                            where: { id: res.body.data[0].id },
                            select: { userId: true },
                        })];
                case 2:
                    application = _a.sent();
                    return [4 /*yield*/, db_1.default.user.findUnique({
                            where: { username: "mockUser" }, // this is the username of the user im using with testToken above
                            select: { id: true },
                        })];
                case 3:
                    user = _a.sent();
                    //compares logged-in user to user attached to application
                    expect(application.userId).toBe(user.id); // checks the userId on the application is same as user the token belongs to
                    return [2 /*return*/];
            }
        });
    }); });
});
(0, node_test_1.describe)("DELETE /api/app", function () {
    it("should delete the application in the path from db, return status 204, have no res body.", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, application;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .delete("/api/app/".concat(applicationId)) // application that belongs to user one
                        .set("Authorization", "Bearer ".concat(testToken)) // test token that belongs to user one\
                        .send()
                        .expect(204)];
                case 1:
                    res = _a.sent();
                    //check response body is empty
                    expect(res.body).toMatchObject({});
                    return [4 /*yield*/, db_1.default.application.findFirst({
                            where: { id: applicationId },
                        })];
                case 2:
                    application = _a.sent();
                    expect(application).toBeFalsy();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should throw an error if application doesnt belong to user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, application;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .delete("/api/app/".concat(secondApplicationId)) // application that belongs to user two
                        .set("Authorization", "Bearer ".concat(testToken)) // test token that belongs to user one
                        .send()
                        .expect(404)];
                case 1:
                    res = _a.sent();
                    //check response body is empty
                    expect(res.body.message).toBe("Record to delete does not exist.");
                    return [4 /*yield*/, db_1.default.application.findFirst({
                            where: { id: applicationId },
                        })];
                case 2:
                    application = _a.sent();
                    expect(application).toBeTruthy(); // this returns null if doesnt exist and therefore truthy if it does exist
                    return [2 /*return*/];
            }
        });
    }); });
    it("should throw an error if application id is not uuid and return with 400 status", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .delete("/api/app/theseareuuidsandthereforethiswillneverexistasaid")
                        .set("Authorization", "Bearer ".concat(testToken))
                        .send()
                        .expect(400)];
                case 1:
                    res = _a.sent();
                    //check response body is empty
                    expect(res.body.errors[0].msg).toBe("Invalid UUID format");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should throw an error if valid uuid is input put the uuid doesnt exist in the database", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                        .delete("/api/app/123e4567-e89b-12d3-a456-426614174000")
                        .set("Authorization", "Bearer ".concat(testToken))
                        .send()
                        .expect(404)];
                case 1:
                    res = _a.sent();
                    expect(res.body.message).toBe("Record to delete does not exist.");
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=api.test.js.map