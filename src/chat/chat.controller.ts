import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Request,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SendMessageDto } from './dto/send-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';

@Controller('chat')
@ApiTags('Chat')
@ApiBearerAuth() // Menandakan bahwa semua endpoint memerlukan token JWT
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Endpoint untuk mengirim pesan
  @UseGuards(JwtAuthGuard)
  @Post('sendMessage')
  @ApiBody({ type: SendMessageDto, description: 'Kirim pesan ke pengguna lain' }) // Swagger body schema
  async sendMessage(
    @Request() req: any,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.chatService.sendMessage(req.user.userId, sendMessageDto);
  }

  // Endpoint untuk melihat pesan
  @UseGuards(JwtAuthGuard)
  @Get('viewMessages')
  @ApiQuery({
    name: 'receiverId',
    description: 'ID penerima untuk melihat pesan',
    required: true,
    example: '60b72b2f9dcd1e001c8a4b1d',
  }) // Menambahkan query Swagger
  async getMessages(
    @Request() req: any,
    @Query() query: GetMessagesDto,
  ) {
    return this.chatService.getMessages(req.user.userId, query.receiverId);
  }
}
