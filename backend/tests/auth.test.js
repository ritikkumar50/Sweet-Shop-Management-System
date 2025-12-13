const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');

beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweetshop_test');
});

afterAll(async () => {
    await mongoose.connection.close();
});

afterEach(async () => {
    // Clean up database after each test
    await User.deleteMany({});
});

describe('Auth Endpoints', () => {

    const mockUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
    };

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(mockUser);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('id');
            expect(res.body.user.email).toBe(mockUser.email);
        });

        it('should not register user with existing email', async () => {
            // Register first
            await new User(mockUser).save();

            // Try register again
            const res = await request(app)
                .post('/api/auth/register')
                .send(mockUser);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('message', 'User already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login exiting user and return token', async () => {
            // Create user manually
            const user = new User(mockUser);
            // Manually hash password logic would be in model, but for test setup we might need to rely on the endpoint working or pre-hash. 
            // Ideally we test the endpoint black-box. So register first.
            await request(app).post('/api/auth/register').send(mockUser);

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: mockUser.email,
                    password: mockUser.password
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should reject invalid credentials', async () => {
            await request(app).post('/api/auth/register').send(mockUser);

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: mockUser.email,
                    password: 'wrongpassword'
                });

            expect(res.statusCode).toBe(400);
        });
    });
});
