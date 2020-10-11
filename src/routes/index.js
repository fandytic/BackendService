import express from 'express';
import UserRoute from './User/UserRoute';

const router = express.Router();

const indexRoutes = (app) => {
  app.use('/', router);
  router.use('/users', UserRoute);
};

export default indexRoutes;
