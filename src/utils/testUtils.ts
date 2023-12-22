import { createNewUser } from "../controllers/user";
import prisma from "../db";
export async function generateJWTForTest() {
  const req = { body: { username: "mockUser", password: "mockUser" } };
  const res = {
    status(statusCode) {
      this.statusCode = statusCode; // Optionally store the status code
      return this; // Return the res object for chaining
    },
    json(data) {
      this.data = data; // Optionally store the data
      return this; // Return the res object for chaining
    },
  };

  const {
    data: { token },
  } = await createNewUser(req, res);

  return token;
}
