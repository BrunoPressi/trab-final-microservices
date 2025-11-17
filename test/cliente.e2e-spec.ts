import { INestApplication } from '@nestjs/common';
import { ClienteService } from '../src/cliente/cliente.service';
import { ClienteController } from '../src/cliente/cliente.controller';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from 'src/prisma/prisma.service';

describe ('Cliente', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [ClienteService, PrismaService]
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST Cliente', async () => {

    const cliente = {
      id: 0,
      cpf: "477.237.600-35",
      nomeCompleto: "Bob Brown",
      email: "bob.brown@email.com",
      telefone: "6827746858"
    }

    const response = await request(app.getHttpServer())
      .post('/cliente')
      .set('Content-Type', 'application/json')
      .send(cliente);

    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual(cliente)
  });

  afterAll(async () => {
    await request(app.getHttpServer()).delete('/cliente/0')
    await app.close();
  });
});