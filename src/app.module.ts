import { Module } from '@nestjs/common';
import { MongooseModule }  from '@nestjs/mongoose'

import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HomeModule } from './home/home.module'

import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { IncidentController } from './incident/incident.controller';
import { IncidentModule } from './incident/incident.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URL
    ),
    AuthModule,
    UsersModule,
    HomeModule,
    IncidentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}