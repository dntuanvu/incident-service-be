import { Test, TestingModule } from '@nestjs/testing';
import { IncidentService } from './incident.service';
import { IncidentSchema } from './incident.model';
import { UserSchema } from '../users/user.model';
import { MongooseModule } from '@nestjs/mongoose'
import { IncidentController } from './incident.controller';
import { ConfigModule } from '@nestjs/config';
import { IncidentModule } from './incident.module';

describe('IncidentService', () => {
  let service: IncidentService;

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
        ]),
        IncidentModule
      ],
      controllers: [IncidentController],
      providers: [IncidentService],
      exports: [IncidentService]
    }).compile();

    service = module.get<IncidentService>(IncidentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
