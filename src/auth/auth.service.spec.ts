import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('AuthController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Auth', () => {
    it('should register', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          firsName: 'Test',
          lastName: 'Doe',
          email: 'test@test.com',
          password: 'test123',
        })
        .expect(201);
    });

    it('should login', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@test.com',
          password: 'test123',
        })
        .expect(200);
    });
  });
});
