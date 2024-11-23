import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // Import UsersController
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController], // Tambahkan UsersController ke controllers
  providers: [UsersService],
  exports: [UsersService], // Menyediakan UsersService untuk module lain jika diperlukan
})
export class UsersModule {}
