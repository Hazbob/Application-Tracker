import { Router, Response } from "express";
import prisma from "../db";
import { UserRequest } from "../types/types";
import { handlePostAppVal, postAppValidators } from "../validators/validators";
const applicationRouter = Router();

applicationRouter.post(
  "/",
  postAppValidators,
  handlePostAppVal,
  async (req: UserRequest, res: Response, next) => {
    try {
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
    if (!applications) {
      throw new Error("No applications Found!");
    }
    return res.status(200).send({ applications: applications });
  } catch (error) {
    next(error);
  }
});
applicationRouter.put("/", (req, res) => {});
applicationRouter.delete("/", (req, res) => {});

export default applicationRouter;
