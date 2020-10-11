import {
  connect,
  closeDatabase,
  clearDatabase
} from '../../src/utils/DBTestUtils';
import { create, findUser } from '../../src/repositories/UserRepository';
import { mockUser } from '../fixtures/User';

describe('UserRespository', () => {
  beforeAll(async () => {
   await connect();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
    jest.clearAllMocks();
  });


  describe('#findUser', () => {
    it('should find all meetups when findUses invoked', async () => {
      await create(mockUser[0]);

      const actualResult = await findUser();

      expect(actualResult)
        .toEqual(expect.arrayContaining([
          expect.objectContaining(
            {
              name: mockUser[0].name,
              email: mockUser[0].email
            }
          )
        ]));
    });
  });

  describe('#create', () => {
    it('should craete user when given data in database', async () => {
      const actualResult = await create(mockUser[0]);

      expect(actualResult)
        .toEqual(expect.objectContaining(
            {
              name: mockUser[0].name,
              email: mockUser[0].email
            }
          )
        );
    });
  });
});
