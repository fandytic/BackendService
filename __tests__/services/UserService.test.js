import {
  createUser,
  getUser
} from '../../src/services/UserService';

import {
  findUser,
  create
} from '../../src/repositories/UserRepository';
import { mockUser } from '../fixtures/User';

jest.mock('../../src/models/User');
jest.mock('../../src/repositories/UserRepository', () => ({
  findUser: jest.fn(),
  create: jest.fn()
}));

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#getUser', () => {
    it('should call findUser when invoked', async () => {
      findUser.mockResolvedValue(mockUser);

      await getUser();

      expect(findUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('#createuser', () => {
    it('should call createUser when invoked', async () => {
     create.mockResolvedValue(mockUser[0]);

     await createUser(mockUser[0]);

     expect(create).toHaveBeenCalledWith(mockUser[0]);
    });
  });
});
