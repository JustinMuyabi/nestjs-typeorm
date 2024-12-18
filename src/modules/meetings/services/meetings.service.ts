import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateMeetingDto} from '../dto/create-meeting.dto';
import {UpdateMeetingDto} from '../dto/update-meeting.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Meeting} from "../entities/meeting.entity";
import {Repository} from "typeorm";
import {AddUserToMeetingDto} from "../dto/add-user-to-meeting.dto";
import {User} from "../../users/entities/user.entity";
import {MeetingResponseDto} from "../dto/meeting-response.dto";

@Injectable()
export class MeetingsService {
  constructor(
      @InjectRepository(Meeting) private readonly meetingRepository: Repository<Meeting>,
      @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const meeting: Meeting = this.meetingRepository.create(createMeetingDto);
    return this.meetingRepository.save(meeting)
  }

  async findAll(): Promise<MeetingResponseDto[]> {
    const meetings: Meeting[] = await this.meetingRepository.find({ relations: ['users'] });
    return meetings.map((meeting: Meeting): MeetingResponseDto => new MeetingResponseDto(meeting));
  }

  async findOne(id: number): Promise<MeetingResponseDto> {
    const meeting: Meeting = await this.getOneMeeting(id);
    if (meeting === null) throw new NotFoundException('Meeting not found');
    return new MeetingResponseDto(meeting);
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto): Promise<Meeting> {
    const meeting: Meeting = await this.getOneMeeting(id)
    if (meeting === null) throw new NotFoundException('Meeting not found');
    await this.meetingRepository.update({id: id}, {...updateMeetingDto,})
    return await this.getOneMeeting(id);
  }

  async addUserToMeeting(
      id: number,
      addUserToMeetingDto: AddUserToMeetingDto
  ): Promise<MeetingResponseDto> {
    const meeting: Meeting = await this.meetingRepository.findOne({
      where: { id: id },
      relations: ['users']
    });

    if (meeting === null) throw new NotFoundException('Meeting not found');

    const user: User = await this.userRepository.findOne({
      where: { id: +addUserToMeetingDto.userId },
    });

    if (user === null) throw new NotFoundException('User not found');
    if (!meeting.users) meeting.users = [];

    meeting.users.push(user);
    const updatedMeeting: Meeting = await this.meetingRepository.save(meeting);
    return new MeetingResponseDto(updatedMeeting);
  }

  private async getOneMeeting(id: number): Promise<Meeting> | null {
    return this.meetingRepository.findOne({where: {id: id}, relations: ['users']})
  }
}
