import { UserRequest } from "../types/types";
import { Response, NextFunction } from "express";
import {
  deleteApplication,
  getApplications,
  postApplications,
  updateApplication,
} from "../models/application.model";
/*
 *
 * PUT application handler*/
export async function handleEditApplication(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const applicationId = req.params.id;
  try {
    const updatedApplication = await updateApplication(req, applicationId);

    if (!updatedApplication) {
      throw new Error("Error updating application");
    }
    res
      .status(200)
      .set("Content-Type", "application/json")
      .send({ data: updatedApplication });
  } catch (error) {
    next(error);
  }
}
/*
 *
 * GET application handler*/
export async function handleGetApplication(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { status } = req.query;

    const applications = await getApplications(req, status);
    if (applications.length === 0) {
      throw new Error("No applications found");
    }
    return res
      .status(200)
      .set("Content-Type", "application/json")
      .send({ data: applications });
  } catch (error) {
    next(error);
  }
}
/*
 *
 * POST application handler*/
export async function handlePostApplication(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user.id) {
      throw new Error("Not Authorised");
    }
    const application = await postApplications(req);
    if (!application) {
      throw new Error("Error adding new application");
    }
    return res
      .status(201)
      .set("Content-Type", "application/json")
      .send({ data: application });
  } catch (error) {
    next(error);
  }
}

export async function handleDeleteApplication(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const applicationId = req.params.id;
  if (!applicationId || typeof applicationId !== "string") {
    return res
      .status(400)
      .set("Content-Type", "application/json")
      .send({ error: "Invalid application ID" });
  }
  try {
    const deletedApplication = await deleteApplication(req, applicationId);
    if (!deletedApplication) {
      throw new Error("Error deleting application");
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
