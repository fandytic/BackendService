import express from 'express';
import { fetchUser, storeUser } from '../../controllers/UserController';

const UserRoute = express.Router();

UserRoute.route('/')
  .get(fetchUser)
  .post(storeUser);

export default UserRoute;
