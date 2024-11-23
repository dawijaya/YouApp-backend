import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage } from './chat.schema';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  private readonly client: ClientProxy;
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @InjectModel(ChatMessage.name) private readonly chatModel: Model<ChatMessage>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: 'chat_queue',
        queueOptions: { durable: true },
      },
    });
  }

  /**
   * Mengirim pesan baru
   * @param senderId ID pengirim
   * @param sendMessageDto Data pesan yang akan dikirim
   */
  async sendMessage(senderId: string, sendMessageDto: SendMessageDto) {
    const { receiverId, message } = sendMessageDto;

    // Simpan pesan ke database
    const chatMessage = new this.chatModel({ senderId, receiverId, content: message });
    try {
      const savedMessage = await chatMessage.save();
      this.logger.log(`Pesan berhasil disimpan: ${JSON.stringify(savedMessage)}`);

      // Kirim event ke RabbitMQ
      this.client.emit('new_message', {
        senderId,
        receiverId,
        message,
        timestamp: savedMessage.timestamp,
      });

      return savedMessage;
    } catch (error) {
      this.logger.error('Gagal menyimpan pesan atau mengirim event', error);
      throw error;
    }
  }

  /**
   * Mengambil pesan antara dua pengguna
   * @param senderId ID pengirim
   * @param receiverId ID penerima
   * @returns Array pesan antara dua pengguna
   */
  async getMessages(senderId: string, receiverId: string) {
    try {
      const messages = await this.chatModel
        .find({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        })
        .sort({ timestamp: 1 }) // Urutkan berdasarkan waktu
        .exec();

      if (!messages.length) {
        this.logger.warn(`Tidak ada pesan ditemukan antara ${senderId} dan ${receiverId}`);
      }

      return messages;
    } catch (error) {
      this.logger.error('Gagal mengambil pesan', error);
      throw error;
    }
  }
}
