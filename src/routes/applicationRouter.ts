import { Router, Response } from "express";
import prisma from "../db";
import { UserRequest, ApplicationType } from "../types/types";
import {
  handlePostAppVal,
  postAppValidators,
  putAppValidators,
} from "../validators/validators";
const applicationRouter = Router();
/**
 * POST application: creates new job application attached to the logged in user
 */

applicationRouter.post(
  "/",
  postAppValidators,
  handlePostAppVal,
  async (req: UserRequest, res: Response, next) => {
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
  },
);

/*
 * GET applications : this retrieves the applications belonging to the logged in user
 * */
applicationRouter.get("/", async (req: UserRequest, res: Response, next) => {
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
});
/*
 * PUT route for updating existing Job Applications*/
applicationRouter.put(
  "/",
  putAppValidators,
  handlePostAppVal,
  (req, res) => {},
);
applicationRouter.delete("/:id", (req, res) => {});

export default applicationRouter;
