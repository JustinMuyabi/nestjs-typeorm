import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {dataSourceOptions} from "./database/typeorm.config";
import { UsersModule } from './modules/users/users.module';
import { MeetingsModule } from './modules/meetings/meetings.module';

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true}),
      TypeOrmModule.forRoot(dataSourceOptions),
      UsersModule,
      MeetingsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
