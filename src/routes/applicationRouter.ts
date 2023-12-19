import { Router, Response, application } from "express";
import prisma from "../db";
import { UserRequest, ApplicationType } from "../types/types";
import {
  handlePostAppVal,
  postAppValidators,
  putAppValidators,
} from "../validators/validators";
import { validationResult } from "express-validator";
import {
  handleEditApplication,
  handleGetApplication,
  handlePostApplication,
} from "../controllers/application";
const applicationRouter = Router();

/**
 * POST application: creates new job application attached to the logged in user
 */

applicationRouter.post(
  "/",
  postAppValidators,
  handlePostAppVal,
  handlePostApplication,
);

/*
 * GET applications : this retrieves the applications belonging to the logged in user
 * */
applicationRouter.get("/", handleGetApplication);
/*
 * PUT route for updating existing Job Applications*/
applicationRouter.put("/:id", putAppValidators, handleEditApplication);

applicationRouter.delete("/:id", (req, res) => {});

export default applicationRouter;
