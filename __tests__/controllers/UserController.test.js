import express from 'express';
import indexRoutes from '../../src/routes/index';
import request from 'supertest';
import http from 'http';
import { createUser, getUser } from '../../src/services/UserService';
import { mockUser } from '../fixtures/User';

jest.mock('../../src/models/User');
jest.mock('../../src/services/UserService', () => ({
  createUser: jest.fn(),
  getUser: jest.fn()
}));

describe('UserController', () => {
  let server;
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    indexRoutes(app);
    server = http.createServer(app);
    server.listen(process.env.TEST_PORT);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    server.close();
  });

  describe('#fetchUser', () => {
    it('should call getuser and return status code 200 when invoked', async () => {
      getUser.mockResolvedValue(mockUser);

      await request(app)
        .get('/users')
        .expect(200, mockUser);

      expect(getUser).toHaveBeenCalledTimes(1);
    });

    it('should call getuser and return status code 500 when failed to fetch data', async () => {
      getUser.mockRejectedValue(mockUser);

      await request(app)
        .get('/users')
        .expect(500, mockUser);
    });
  });

  describe('#storeUser', () => {
    it('should call storeUser function and return status code 201 when invoked', async () => {
      createUser.mockResolvedValue(mockUser);

      await request(app)
        .post('/users')
        .send(mockUser)
        .set('Accept', 'application/json')
        .expect((res) => res.body = mockUser)
        .expect(201, mockUser);

      expect(createUser).toHaveBeenCalledWith(mockUser);
    });

    it('should call storeUser and return status code 500 when failed to store data', async () => {
      createUser.mockRejectedValue(mockUser);

      await request(app)
        .post('/users')
        .send(mockUser)
        .expect(500, mockUser);
    });
  });
});
