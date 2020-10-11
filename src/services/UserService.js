import { create, findUser } from '../repositories/UserRepository';

const getUser = async () => {
  return await findUser();
};

const createUser = async (body) => {
  return await create(body);
};

export {
  getUser,
  createUser
};
