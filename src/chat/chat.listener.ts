import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatListener {
  constructor(private readonly chatGateway: ChatGateway) {}

  @EventPattern('new_message')
  async handleNewMessage(data: any) {
    console.log('New message received:', data);
    this.chatGateway.sendNotification(data);
  }
}
