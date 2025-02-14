import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const compareHashedPassword = async (password: string, correctPassword: string) => {
  try {
    return await bcrypt.compare(password, correctPassword);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
