import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { UserFormInput } from './user.interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @Header('Content-type', 'application/json')
  async getAllUser(): Promise<string> {
    return JSON.stringify(await this.userService.getUsers());
  }

  @Get(':id')
  @Header('Content-type', 'application/json')
  getUser(@Param('id') id: number): string {
    return JSON.stringify(this.userService.getUser(id));
  }

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  creteUser(@Body() userData: UserFormInput) {
    return this.userService.createUser({
      public_name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      password: userData.password,
    });
  }
}
