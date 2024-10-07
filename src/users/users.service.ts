import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async findAll() {
    const users = await this.usersRepository.find();

    if (!users.length) throw new NotFoundException('No users were found');

    return users;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({ where: {email}, select: {id: true, name: true, email: true, password: true, role: true} });
  }


  async findOneById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with id ${id} was not found`);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
