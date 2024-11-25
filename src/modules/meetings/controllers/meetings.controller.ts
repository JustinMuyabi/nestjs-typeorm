import {Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {MeetingsService } from '../services/meetings.service';
import {CreateMeetingDto } from '../dto/create-meeting.dto';
import {UpdateMeetingDto } from '../dto/update-meeting.dto';
import {AddUserToMeetingDto} from "../dto/add-user-to-meeting.dto";
import {MeetingResponseDto} from "../dto/meeting-response.dto";

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingsService.create(createMeetingDto);
  }

  @Get()
  findAll(): Promise<MeetingResponseDto[]> {
    return this.meetingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<MeetingResponseDto> {
    return this.meetingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingsService.update(+id, updateMeetingDto);
  }

  @Post(':id/users')
  addMeetingUser(@Param('id') id: number, @Body() addUserToMeetingDto: AddUserToMeetingDto) {
    return this.meetingsService.addUserToMeeting(id, addUserToMeetingDto);
  }
}
