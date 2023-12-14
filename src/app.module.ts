import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './providers/prisma.service';
import { UserService } from './modules/user/user.service';
import { UserController } from './modules/user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [PrismaService, AppService, UserService],
})
export class AppModule {}
