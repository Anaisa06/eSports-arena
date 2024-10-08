import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrivateService } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PrivateService(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @PrivateService()
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

}
