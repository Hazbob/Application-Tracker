import { createNewUser } from "../controllers/user";
export async function generateJWTForTest() {
  const req = { body: { username: "mockUser", password: "mockUser" } };
  const res = {
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
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

export async function createSecondUser(): Promise<any> {
  const req = {
    body: { username: "secondMockUser", password: "secondMockUser" },
  };
  const res = {
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
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
