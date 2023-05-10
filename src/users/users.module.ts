import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from 'src/bookmark/bookmark.entity';
import { Catalogue } from 'src/catalogue/catalogue.entity';
import { OtpService } from './otp.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, OtpService],
  exports: [UsersService]
})
export class UsersModule { }
