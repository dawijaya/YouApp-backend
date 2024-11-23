import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesDto {
  @ApiProperty({
    description: 'ID penerima untuk melihat pesan',
    example: '60b72b2f9dcd1e001c8a4b1d',
  })
  @IsString()
  @IsNotEmpty()
  receiverId: string;
}
