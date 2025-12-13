const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweetshop_test');
});

afterAll(async () => {
    await mongoose.connection.close();
});

afterEach(async () => {
    await Sweet.deleteMany({});
    await User.deleteMany({});
});

describe('Sweets Endpoints', () => {
    let adminToken;
    let userToken;

    beforeEach(async () => {
        // Create Admin
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin'
        });
        const resAdmin = await request(app).post('/api/auth/login').send({ email: 'admin@example.com', password: 'password123' });
        adminToken = resAdmin.body.token;

        // Create User
        await User.create({
            name: 'User',
            email: 'user@example.com',
            password: 'password123',
            role: 'user'
        });
        const resUser = await request(app).post('/api/auth/login').send({ email: 'user@example.com', password: 'password123' });
        userToken = resUser.body.token;
    });

    const mockSweet = {
        name: 'Chocolate Truffle',
        category: 'Chocolates',
        price: 5.99,
        quantity: 100,
        description: 'Delicious dark chocolate',
        image: 'http://example.com/image.jpg'
    };

    describe('POST /api/sweets', () => {
        it('should create a sweet if admin', async () => {
            const res = await request(app)
                .post('/api/sweets')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(mockSweet);

            expect(res.statusCode).toBe(201);
            expect(res.body.data.name).toBe(mockSweet.name);
        });

        it('should fail if not admin', async () => {
            const res = await request(app)
                .post('/api/sweets')
                .set('Authorization', `Bearer ${userToken}`)
                .send(mockSweet);

            expect(res.statusCode).toBe(403);
        });
    });

    describe('GET /api/sweets', () => {
        it('should get all sweets', async () => {
            await Sweet.create(mockSweet);
            const res = await request(app).get('/api/sweets');
            expect(res.statusCode).toBe(200);
            expect(res.body.count).toBe(1);
        });
    });

    describe('GET /api/sweets/search', () => {
        beforeEach(async () => {
            await Sweet.create([
                { ...mockSweet, name: 'Choco Cake', category: 'Cakes', price: 15 },
                { ...mockSweet, name: 'Vanilla Pastry', category: 'Pastries', price: 5 },
                { ...mockSweet, name: 'Choco Bar', category: 'Chocolates', price: 2 }
            ]);
        });

        it('should search by name', async () => {
            const res = await request(app).get('/api/sweets/search?name=Choco');
            expect(res.statusCode).toBe(200);
            expect(res.body.count).toBe(2); // Choco Cake, Choco Bar
        });

        it('should filter by category', async () => {
            const res = await request(app).get('/api/sweets/search?category=Cakes');
            expect(res.statusCode).toBe(200);
            expect(res.body.count).toBe(1);
            expect(res.body.data[0].name).toBe('Choco Cake');
        });

        it('should filter by price range', async () => {
            const res = await request(app).get('/api/sweets/search?minPrice=3&maxPrice=10');
            expect(res.statusCode).toBe(200);
            expect(res.body.count).toBe(1);
            expect(res.body.data[0].name).toBe('Vanilla Pastry');
        });
    });

    describe('PUT /api/sweets/:id', () => {
        it('should update sweet if admin', async () => {
            const sweet = await Sweet.create(mockSweet);
            const res = await request(app)
                .put(`/api/sweets/${sweet._id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ price: 10.99 });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.price).toBe(10.99);
        });
    });

    describe('DELETE /api/sweets/:id', () => {
        it('should delete sweet if admin', async () => {
            const sweet = await Sweet.create(mockSweet);
            const res = await request(app)
                .delete(`/api/sweets/${sweet._id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(200);

            const found = await Sweet.findById(sweet._id);
            expect(found).toBeNull();
        });
    });
});
