const { UniqueConstraintError } = require('sequelize');
const AuthService = require('../../src/services/authService.js');
const db = require('../../database/models/index.js').User;
const passwordUtil = require('../../src/utils/passwordUtil');
const tokenUtil = require('../../src/utils/tokenUtil');


describe('Auth Service', () => {
  describe('createUser', () => {
    it('should create a user when email and password is valid', async () => {
      const mockUser = {
        id: 1,
        email: 'test1',
        password: 'encryptedPassword',
        createdAt: '2021-03-01T00:00:00.000Z',
        updatedAt: '2021-03-01T00:00:00.000Z',
      };
      jest.spyOn(passwordUtil, 'encryptPassword').mockResolvedValue('encryptedPassword');
      jest.spyOn(db, 'create').mockResolvedValue({
        mockUser
      });
      jest.spyOn(db, 'findOne').mockResolvedValue({
        id: 1,
        email: 'test1',
        createdAt: '2021-03-01T00:00:00.000Z',
        updatedAt: '2021-03-01T00:00:00.000Z',
      });
      const user = await AuthService.createUser('test', 'password');
      expect(user).toEqual(undefined);
    });

    it('should throw an error if email is already taken', (async () => {
      jest.spyOn(db, 'create').mockRejectedValueOnce(new UniqueConstraintError());
      await expect(AuthService.createUser('test', 'password')).rejects.toEqual(expect.objectContaining({ message: 'Username already exists' }));
    }
    ));

  });
  describe('loginUser', () => {
    const mockUser = {
      id: 1,
      email: 'test2',
      password: 'password',
      createdAt: '2021-03-01T00:00:00.000Z',
      updatedAt: '2021-03-01T00:00:00.000Z',
    };

    it('should return user if email and password is valid', async () => {
      jest.spyOn(db, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(passwordUtil, 'checkEncryptedPassword').mockResolvedValue(true);
      jest.spyOn(tokenUtil, 'generateToken').mockResolvedValue('token');
      const decodedToken = await AuthService.loginUser('test', 'password');
      expect(decodedToken).toEqual({'user': mockUser,'token': 'token', email: 'test'});
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(db, 'findOne').mockResolvedValue(null);
      await expect(AuthService.loginUser('test', 'password')).rejects.toEqual(expect.objectContaining({ message: 'User not found' }));
    });

    it('should throw an error if password is invalid', async () => {
      jest.spyOn(db, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(passwordUtil, 'checkEncryptedPassword').mockResolvedValue(false);
      await expect(AuthService.loginUser('test', 'password')).rejects.toEqual(expect.objectContaining({ message: 'Invalid password' }));
    });

  });

  describe('checkTokenValidity', () => {
    it('should return decoded token if token is valid', async () => {
      jest.spyOn(tokenUtil, 'verifyToken').mockResolvedValue({ id: 1 });
      const decodedToken = await AuthService.checkTokenValidity('token');
      expect(decodedToken).toEqual({ id: 1 });
    });
    it('should throw an error if token is invalid', async () => {
      jest.spyOn(tokenUtil, 'verifyToken').mockResolvedValue(null);
      await expect(AuthService.checkTokenValidity('token')).rejects.toEqual(expect.objectContaining({ message: 'Invalid token' }));
    });
  });

  describe('loginAdmin', () => {
    const mockAdmin = {
      id: 1,
      email: 'test2',
      password: 'password',
      isAdmin: true,
      createdAt: '2021-03-01T00:00:00.000Z',
      updatedAt: '2021-03-01T00:00:00.000Z',
    };

    it('should return admin if email and password is valid', async () => {
      jest.spyOn(db, 'findOne').mockResolvedValue(mockAdmin);
      jest.spyOn(passwordUtil, 'checkEncryptedPassword').mockResolvedValue(true);
      jest.spyOn(tokenUtil, 'generateToken').mockResolvedValue('token');
      const decodedToken = await AuthService.loginAdmin('test', 'password');
      expect(decodedToken).toEqual({user: mockAdmin, token: 'token'});
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(db, 'findOne').mockResolvedValue(null);
      await expect(AuthService.loginAdmin('test', 'password')).rejects.toEqual(expect.objectContaining({ message: 'User not found' }));
    });

    it('should throw an error if user is not an admin', async () => {
      jest.spyOn(db, 'findOne').mockResolvedValue({isAdmin: false});
      await expect(AuthService.loginAdmin('test', 'password')).rejects.toEqual(expect.objectContaining({ message: 'User is not an admin' }));
    });

    it('should throw an error if password is invalid', async () => {
      jest.spyOn(db, 'findOne').mockResolvedValue(mockAdmin);
      jest.spyOn(passwordUtil, 'checkEncryptedPassword').mockResolvedValue(false);
      await expect(AuthService.loginAdmin('test', 'password')).rejects.toEqual(expect.objectContaining({ message: 'Invalid password' }));
    });

  });

});