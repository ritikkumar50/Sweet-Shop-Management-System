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

describe('Inventory Endpoints', () => {
    let userToken;

    beforeEach(async () => {
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
        name: 'Cookie',
        category: 'Cookies',
        price: 2.50,
        quantity: 5,
        description: 'Choco chip',
        image: 'img.jpg'
    };

    describe('POST /api/sweets/:id/purchase', () => {
        it('should purchase a sweet and decrease quantity', async () => {
            const sweet = await Sweet.create(mockSweet);
            const purchaseQty = 2;

            const res = await request(app)
                .post(`/api/sweets/${sweet._id}/purchase`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: purchaseQty });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.quantity).toBe(3); // 5 - 2 = 3

            // Verify in DB
            const updated = await Sweet.findById(sweet._id);
            expect(updated.quantity).toBe(3);
        });

        it('should fail if insufficient stock', async () => {
            const sweet = await Sweet.create(mockSweet);
            const purchaseQty = 10; // > 5

            const res = await request(app)
                .post(`/api/sweets/${sweet._id}/purchase`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: purchaseQty });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toMatch(/insufficient stock/i);
        });

        it('should fail if quantity is 0', async () => {
            const sweet = await Sweet.create({ ...mockSweet, quantity: 0 });

            const res = await request(app)
                .post(`/api/sweets/${sweet._id}/purchase`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: 1 });

            expect(res.statusCode).toBe(400);
        });
    });
});
