import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Meeting} from "./entities/meeting.entity";
import {Repository} from "typeorm";

@Injectable()
export class MeetingsService {
  constructor(
      @InjectRepository(Meeting) private readonly meetingRepository: Repository<Meeting>
  ) {}

  create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const meeting: Meeting = this.meetingRepository.create(createMeetingDto);
    return this.meetingRepository.save(meeting)
  }

  findAll(): Promise<Meeting[]> {
    return this.meetingRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} meeting`;
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return `This action updates a #${id} meeting`;
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }
}
