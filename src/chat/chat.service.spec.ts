import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { getModelToken } from '@nestjs/mongoose';
import { ChatMessage } from './chat.schema';

describe('ChatService', () => {
  let service: ChatService;
  const mockChatModel = {
    save: jest.fn(),
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({ exec: jest.fn() }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getModelToken(ChatMessage.name),
          useValue: mockChatModel,
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should send a message', async () => {
    mockChatModel.save.mockImplementationOnce((data) => Promise.resolve(data));
    const result = await service.sendMessage('123', '456', 'Test message');
    expect(result.message).toBe('Test message');
    expect(mockChatModel.save).toHaveBeenCalled();
  });
});
