"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validators_1 = require("../validators/validators");
var application_1 = require("../controllers/application");
var applicationRouter = (0, express_1.Router)();
/**
 * POST application: creates new job application attached to the logged in user
 */
applicationRouter.post("/", validators_1.checkNotEmptyBody, validators_1.postAppValidators, validators_1.handlePostAppVal, application_1.handlePostApplication);
/*
 * GET applications : this retrieves the applications belonging to the logged in user
 * */
applicationRouter.get("/", application_1.handleGetApplication);
/*
 * PUT route for updating existing Job Applications*/
applicationRouter.put("/:id", validators_1.putAppValidators, validators_1.idParamValidators, validators_1.checkNotEmptyBody, validators_1.handlePostAppVal, application_1.handleEditApplication);
/*
 * DELETE route for deleting a specific job application*/
applicationRouter.delete("/:id", validators_1.idParamValidators, validators_1.handlePostAppVal, application_1.handleDeleteApplication);
exports.default = applicationRouter;
//# sourceMappingURL=applicationRouter.js.map