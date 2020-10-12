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
    const data = {
      'code' : 200,
      'message' : 'success',
      'data' : fetchedUser
    }
    return res.status(HTTP_STATUS_OK).send(data);
  } catch (error){
    const errorStatus = {
      'code' : 500,
      'message' : 'Internal Server Error'
    }
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send(errorStatus);
  }
};

const storeUser = async (req, res) => {
  try {
    const createdUser = await createUser(req.body);
    const data = {
      'code' : 201,
      'message' : 'success',
      'data' : createdUser
    }
    return res.status(HTTP_STATUS_CREATED).send(data);
  } catch(error){
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send(error);
  }
};

export {
  fetchUser,
  storeUser
};
