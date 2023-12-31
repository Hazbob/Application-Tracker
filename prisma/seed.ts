import prisma from "../src/db";
import { generateJWTForTest } from "../src/utils/testUtils";

export default async function seed() {
  let testToken: string;
  testToken = await generateJWTForTest();
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

  return { testToken: testToken, applicationId: application.id };
}
