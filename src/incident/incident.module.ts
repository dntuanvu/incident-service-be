import { Module } from '@nestjs/common';
import { IncidentController } from './incident.controller';
import { IncidentService } from './incident.service';
import { MongooseModule } from '@nestjs/mongoose'
import { IncidentSchema } from './incident.model';
import { UserSchema } from '../users/user.model';

@Module({
  imports: [
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
  controllers: [IncidentController],
  providers: [IncidentService],
  exports: [IncidentService]
})
export class IncidentModule {}
