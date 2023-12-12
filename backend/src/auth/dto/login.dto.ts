import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'username' })
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'password' })
  password: string;

  @ApiProperty({ example: null })
  image?: string;
}
