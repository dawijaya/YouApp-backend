import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({
    description: 'ID penerima pesan',
    example: '60b72b2f9dcd1e001c8a4b1d', // Contoh ID penerima dari socket.io
  })
  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty({
    description: 'Isi pesan yang akan dikirim',
    example: 'Halo, bagaimana kabarmu?',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
