import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Users') // Menandai semua endpoint dalam controller ini sebagai bagian dari grup "Users"
@ApiBearerAuth() // Menambahkan autentikasi Bearer (JWT) di Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint untuk membuat pengguna baru
  @Post('createUser')
  @ApiOperation({ summary: 'Membuat pengguna baru' })
  @ApiResponse({
    status: 201,
    description: 'Pengguna baru berhasil dibuat.',
  })
  @ApiResponse({
    status: 400,
    description: 'Permintaan tidak valid.',
  })
  @ApiBody({ type: CreateUserDto }) // Swagger akan mendeteksi body request dari DTO ini
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Endpoint untuk mendapatkan informasi pengguna berdasarkan ID atau pengguna saat ini
  @UseGuards(JwtAuthGuard)
  @Get('getUser')
  @ApiOperation({ summary: 'Mengambil data pengguna' })
  @ApiResponse({
    status: 200,
    description: 'Data pengguna berhasil diambil.',
  })
  @ApiResponse({
    status: 401,
    description: 'Autentikasi gagal.',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'ID pengguna (opsional)',
  })
  async getUser(@Request() req: any, @Query() getUserDto: GetUserDto) {
    // Jika userId tidak ada, gunakan ID pengguna saat ini
    const userId = getUserDto.userId || req.user.userId;
    return this.usersService.getUser(userId);
  }

  // Endpoint untuk membuat atau memperbarui profil pengguna
  @UseGuards(JwtAuthGuard)
  @Post('createProfile')
  @ApiOperation({ summary: 'Buat atau perbarui profil pengguna' })
  @ApiResponse({
    status: 201,
    description: 'Profil pengguna berhasil dibuat atau diperbarui.',
  })
  @ApiResponse({
    status: 400,
    description: 'Permintaan tidak valid.',
  })
  @ApiResponse({
    status: 401,
    description: 'Autentikasi gagal.',
  })
  @ApiBody({ type: UpdateUserDto }) // Swagger akan mendeteksi body request dari DTO ini
  async createProfile(
    @Request() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.createOrUpdateProfile(
      req.user.userId,
      updateUserDto,
    );
  }

  // Endpoint untuk mendapatkan profil pengguna saat ini
  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  @ApiOperation({ summary: 'Ambil profil pengguna saat ini' })
  @ApiResponse({
    status: 200,
    description: 'Profil pengguna berhasil diambil.',
  })
  @ApiResponse({
    status: 401,
    description: 'Autentikasi gagal.',
  })
  async getProfile(@Request() req: any) {
    return this.usersService.getProfile(req.user.userId);
  }

  // Endpoint untuk memperbarui profil pengguna
  @UseGuards(JwtAuthGuard)
  @Put('updateProfile')
  @ApiOperation({ summary: 'Perbarui profil pengguna' })
  @ApiResponse({
    status: 200,
    description: 'Profil pengguna berhasil diperbarui.',
  })
  @ApiResponse({
    status: 400,
    description: 'Permintaan tidak valid.',
  })
  @ApiResponse({
    status: 401,
    description: 'Autentikasi gagal.',
  })
  @ApiBody({ type: UpdateUserDto }) // Swagger akan mendeteksi body request dari DTO ini
  async updateProfile(
    @Request() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.createOrUpdateProfile(
      req.user.userId,
      updateUserDto,
    );
  }
}
