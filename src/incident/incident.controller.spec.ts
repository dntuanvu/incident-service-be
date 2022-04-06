import { Test, TestingModule } from '@nestjs/testing';
import { IncidentController } from './incident.controller';
import { IncidentSchema } from './incident.model';
import { UserSchema } from '../users/user.model';
import { MongooseModule } from '@nestjs/mongoose'

import { ConfigModule } from '@nestjs/config';
import { IncidentModule } from './incident.module';
import { IncidentService } from './incident.service';

describe('IncidentController', () => {
  let controller: IncidentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
              name: 'Incident',
              schema: IncidentSchema
            },
            {
              name: 'Users',
              schema: UserSchema
          }
        ])
      ],
      //controllers: [IncidentController],
      exports: [IncidentController]
    }).compile();

    controller = module.get<IncidentController>(IncidentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
