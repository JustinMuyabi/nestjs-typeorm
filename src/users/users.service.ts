import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.getOneUser(id)
    if (user === null) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.getOneUser(id)
    if (user === null) throw new NotFoundException('User not found');
    await this.userRepository.update({id: id}, {...updateUserDto,})
    return await this.getOneUser(id);
  }

  private async getOneUser(id: number): Promise<User> | null {
    return this.userRepository.findOne({where: {id: id}})
  }
}
