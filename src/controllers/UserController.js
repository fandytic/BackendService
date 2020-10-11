import { httpStatusConstants } from '../constants/httpStatusConstants';
import {
  createUser,
  getUser
} from '../services/UserService';

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_CREATED
} = httpStatusConstants;

const fetchUser = async (req, res) => {
  try {
    const fetchedUser = await getUser();
    return res.status(HTTP_STATUS_OK).send(fetchedUser);
  } catch (error){
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send(error);
  }
};

const storeUser = async (req, res) => {
  try {
    const createdUser = await createUser(req.body);
    return res.status(HTTP_STATUS_CREATED).send(createdUser);
  } catch(error){
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send(error);
  }
};

export {
  fetchUser,
  storeUser
};
