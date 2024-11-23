import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { CommonModule } from './common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    // Integrasi MongoDB dengan Mongoose
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost/nestdb',
    ),

    // Modul-modul aplikasi
    AuthModule,
    UsersModule,
    ChatModule,
    CommonModule,

    // Integrasi RabbitMQ untuk Chat Service
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:15672'], // URL RabbitMQ
          queue: 'chat_queue', // Nama queue
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController], // Controller utama
  providers: [
    AppService, // Service utama
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Guard untuk melindungi rute dengan JWT
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, // Pipe untuk validasi input
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter, // Filter untuk penanganan error
    },
  ],
})
export class AppModule {}
