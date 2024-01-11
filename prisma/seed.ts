import prisma from "../src/db";
import { createSecondUser, generateJWTForTest } from "../src/utils/testUtils";

export default async function seed() {
  let testToken: string;
  let secondtestToken: string;
  testToken = await generateJWTForTest();
  secondtestToken = await createSecondUser();

  const user = await prisma.user.findUnique({
    where: {
      username: "mockUser",
    },
    select: {
      id: true,
    },
  });
  const application = await prisma.application.create({
    data: {
      jobTitle: "mockApp",
      companyName: "mockCompany",
      userId: user.id,
    },
  });
  const secondUser = await prisma.user.findUnique({
    where: {
      username: "secondMockUser",
    },
    select: {
      id: true,
    },
  });
  const secondApplication = await prisma.application.create({
    data: {
      jobTitle: "mockAppTwo",
      companyName: "mockCompanyTwo",
      userId: secondUser.id,
    },
  });

  const queryApplication = await prisma.application.create({
    data: {
      jobTitle: "statusTest",
      companyName: "StatusTestCompany",
      userId: user.id,
      status: "OFFER_DECLINED",
    },
  });

  return {
    testToken: testToken,
    applicationId: application.id,
    secondApplicationId: secondApplication.id,
    queryApplicaitonId: queryApplication.id,
  };
}
