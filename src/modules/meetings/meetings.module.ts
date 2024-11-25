import {Module} from '@nestjs/common';
import {MeetingsService} from './services/meetings.service';
import {MeetingsController} from './controllers/meetings.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Meeting} from "./entities/meeting.entity";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Meeting, User])],
  controllers: [MeetingsController],
  providers: [MeetingsService],
})
export class MeetingsModule {}
