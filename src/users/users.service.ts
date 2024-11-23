import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, // Gunakan UserDocument
  ) {}

  // Buat pengguna baru
  async createUser(createUserDto: Partial<User>): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save(); // Metode save() akan tersedia
  }

  // Cari pengguna berdasarkan email
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec(); // Pastikan return-nya UserDocument
  }

  // Buat atau perbarui profil pengguna
  async createOrUpdateProfile(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $set: updateUserDto },
        { new: true, upsert: true }, // Upsert: buat jika belum ada
      )
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  // Dapatkan profil pengguna
  async getProfile(userId: string): Promise<UserDocument | null> {
    return this.userModel
      .findById(userId)
      .select('-password') // Exclude password untuk keamanan
      .exec();
  }

  // **Fungsi Baru: Dapatkan pengguna berdasarkan ID**
  async getUser(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`Pengguna dengan ID ${userId} tidak ditemukan.`);
    }
    return user;
  }
}
