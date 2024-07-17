import { systemUser } from "../models";

async function createUserQuery(userData: {
  emailAddress: string;
  name: string;
}): Promise<{
  status: boolean;
  status_code: number;
  message: string;
  userId: any;
}> {
  try {
    const details = await systemUser.create({
      email_address: userData.emailAddress,
      name: userData.name,
      password: null,
      created_by: null,
    });
    return await Promise.resolve({
      status: true,
      status_code: 201,
      message: "User created successfully",
      userId: details._id,
    });
  } catch (error) {
    return await Promise.reject(error);
  }
}

export { createUserQuery };
