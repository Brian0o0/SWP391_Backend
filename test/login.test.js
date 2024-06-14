// login.test.js

const { login } = require('../src/controllers/userController'); // Đường dẫn đến file chứa hàm login
const bcrypt = require('bcrypt');

describe('Test login function', () => {
    it('should return 400 if missing username, email, or password', () => {
        const req = { body: { username: '', email: '', password: '' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Missing username, email or password.');
    });

    it('should return 401 if username does not exist', async () => {
        const req = { body: { username: 'nonexistent', email: 'test@example.com', password: '1234567' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Username does not exist.');
    });

    it('should return 401 if password is incorrect', async () => {
        const req = { body: { username: 'huytrinh', email: 'test@example.com', password: '1234523' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Incorrect password.');
    });


});








// it('should return 200 with access token and refresh token if login is successful', async () => {
//     const req = { body: { username: 'huytrinh', email: 'test@example.com', password: 'huytrinh' } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//     await login(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
//         accessToken: expect.any(String),
//         refreshToken: expect.any(String),
//     }));
// });