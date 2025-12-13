import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Auth (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        dataSource = moduleFixture.get(DataSource);
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        // Clean up database before each test
        await dataSource.synchronize(true);
    });

    describe('/auth/register (POST)', () => {
        it('should register a new user', async () => {
            const email = 'test@example.com';
            const password = 'password123';

            const response = await request(app.getHttpServer())
                .post('/auth/register')
                .send({ email, password })
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.email).toBe(email);
            expect(response.body).not.toHaveProperty('password'); // Password should not be returned
        });

        it('should fail with invalid email', () => {
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({ email: 'invalid-email', password: 'password123' })
                .expect(400);
        });

        it('should fail if email already exists', async () => {
            const email = 'duplicate@example.com';
            await request(app.getHttpServer())
                .post('/auth/register')
                .send({ email, password: 'password123' })
                .expect(201);

            return request(app.getHttpServer())
                .post('/auth/register')
                .send({ email, password: 'password123' })
                .expect(409); // Conflict
        });
    });

    describe('/auth/login (POST)', () => {
        it('should login and return JWT token', async () => {
            // First register
            const email = 'login@example.com';
            const password = 'password123';
            await request(app.getHttpServer())
                .post('/auth/register')
                .send({ email, password })
                .expect(201);

            // Then login
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({ email, password })
                .expect(201); // NestJS defaults POST to 201

            expect(response.body).toHaveProperty('access_token');
        });

        it('should fail with invalid credentials', async () => {
            const email = 'login_fail@example.com';
            const password = 'password123';
            await request(app.getHttpServer())
                .post('/auth/register')
                .send({ email, password })
                .expect(201);

            return request(app.getHttpServer())
                .post('/auth/login')
                .send({ email, password: 'wrongpassword' })
                .expect(401);
        });
    });
});
