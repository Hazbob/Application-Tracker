import { UserRequest } from "../types/types";
import { Response, NextFunction } from "express";
import prisma from "../db";
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
        contactDetails: true,
      },
      data: {
        jobTitle: req.body.jobTitle,
        companyName: req.body.companyName,
        status: req.body.status,
        contactDetails: req.body.contactDetails,
        imageUrl: req.body.imageUrl,
        appliedDate: req.body.appliedDate,
      },
    });
    if (!updateApplication) {
      throw new Error("Error updating application");
    }
    res.status(200).send({ updateApplication });
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
        contactDetails: true,
        status: true,
      },
    });

    if (applications.length === 0) {
      throw new Error("No applications Found");
    }
    return res.status(200).send({ applications: applications });
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
        imageUrl: req.body.imageUrl,
        userId: req.user.id,
      },
    });

    if (!application) {
      throw new Error("Error adding new application");
    }
    return res
      .status(201)
      .send({ message: "New Application Added, Good Luck!" });
  } catch (error) {
    next(error);
  }
}