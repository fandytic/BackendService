import User from '../models/User';

const findUser = () => {
  return User.find();
};

const create = (user, opts = null) => {
  return User.create(user, opts);
};

export {
  findUser,
  create
};
