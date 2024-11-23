import { Test, TestingModule } from '@nestjs/testing';
import { ChatListener } from './chat.listener';

describe('ChatListener', () => {
  let listener: ChatListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatListener],
    }).compile();

    listener = module.get<ChatListener>(ChatListener);
  });

  it('should handle new messages correctly', async () => {
    const data = {
      senderId: '123',
      receiverId: '456',
      message: 'Hello!',
      timestamp: new Date(),
    };

    const spy = jest.spyOn(console, 'log').mockImplementation();
    await listener.handleNewMessage(data);

    expect(spy).toHaveBeenCalledWith('New message received:', data);
    spy.mockRestore();
  });
});
