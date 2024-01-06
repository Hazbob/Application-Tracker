import { UserRequest } from "../types/types";
import { Response, NextFunction, application } from "express";
import prisma from "../db";
import formatDateStringToISO from "../utils/api.utils";
import app from "../server";
/*
 *
 * PUT application handler*/
export async function handleEditApplication(
  req: UserRequest,
  res: Response,
  next,
) {
  const applicationId = req.params.id;
  try {
    const updateApplication = await prisma.application.update({
      where: {
        id: applicationId,
        userId: req.user.id,
      },
      select: {
        jobTitle: true,
        companyName: true,
        status: true,
        imageUrl: true,
        appliedDate: true,
        notes: true,
      },
      data: {
        jobTitle: req.body.jobTitle,
        companyName: req.body.companyName,
        status: req.body.status,
        notes: req.body.notes,
        imageUrl: req.body.imageUrl,
        appliedDate: formatDateStringToISO(req.body.appliedDate),
      },
    });

    if (!updateApplication) {
      throw new Error("Error updating application");
    }
    res.status(200).send({ data: updateApplication });
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
    const applications = await prisma.application.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        jobTitle: true,
        companyName: true,
        appliedDate: true,
        imageUrl: true,
        notes: true,
        status: true,
      },
    });
    if (applications.length === 0) {
      throw new Error("No applications found");
    } else {
      return res.status(200).send({ data: applications });
    }
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
    if (!req.user.id) res.status(401).send({ message: "Not Authorised" });
    const application = await prisma.application.create({
      data: {
        jobTitle: req.body.jobTitle,
        companyName: req.body.companyName,
        userId: req.user.id,
        notes: req.body.notes,
        status: req.body.status,
      },
    });

    if (!application) {
      throw new Error("Error adding new application");
    }
    return res.status(201).send({ data: application });
  } catch (error) {
    next(error);
  }
}

export async function handleDeleteApplication(req, res, next) {
  const applicationId = req.params.id;
  if (!applicationId || typeof applicationId !== "string") {
    return res.status(400).send("Invalid application ID");
  }
  try {
    const deletedApplication = await prisma.application.delete({
      where: {
        id: applicationId,
        userId: req.user.id,
      },
    });
    if (!deletedApplication) {
      throw new Error("Error deleting application");
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
