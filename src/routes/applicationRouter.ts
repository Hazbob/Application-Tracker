import { Router } from "express";

import {
  checkNotEmptyBody,
  handlePostAppVal,
  idParamValidators,
  postAppValidators,
  putAppValidators,
} from "../validators/validators";

import {
  handleDeleteApplication,
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
  checkNotEmptyBody,
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
applicationRouter.put(
  "/:id",
  putAppValidators,
  idParamValidators,
  checkNotEmptyBody,
  handlePostAppVal,
  handleEditApplication,
);

/*
 * DELETE route for deleting a specific job application*/
applicationRouter.delete(
  "/:id",
  idParamValidators,
  handlePostAppVal,
  handleDeleteApplication,
);

export default applicationRouter;
