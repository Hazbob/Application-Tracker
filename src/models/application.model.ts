import prisma from "../db";
import formatDateStringToISO from "../utils/api.utils";

export async function updateApplication(req, applicationId) {
  try {
    return await prisma.application.update({
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
  } catch (error) {
    throw error;
  }
}

export async function getApplications(req) {
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
    return applications;
  } catch (error) {
    throw error;
  }
}

export async function postApplications(req) {
  try {
    const application = await prisma.application.create({
      data: {
        jobTitle: req.body.jobTitle,
        companyName: req.body.companyName,
        userId: req.user.id,
        notes: req.body.notes,
        status: req.body.status,
      },
    });

    return application;
  } catch (error) {
    throw error;
  }
}

export async function deleteApplication(req, applicationId) {
  try {
    const deletedApplication = await prisma.application.delete({
      where: {
        id: applicationId,
        userId: req.user.id,
      },
    });
    return deletedApplication;
  } catch (error) {
    throw error;
  }
}
