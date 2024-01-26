import * as bcrypt from 'bcrypt';

export const hashPassword = (plainPassword: string) => {
  const SALT = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
  return bcrypt.hash(plainPassword, SALT);
};

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string,
) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
