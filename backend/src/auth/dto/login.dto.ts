import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from 'src/constant/errorMessages';

export class LoginDto {
    @ApiProperty({ example: 'jg0Zi@example.com', required: true })
    @IsEmail({}, { message: ErrorMessages.validation.IS_EMAIL })
    email: string;

    @ApiProperty({ example: 'password', required: true })
    @IsString()
    @IsNotEmpty({ message: ErrorMessages.validation.IS_NOT_EMPTY })
    password: string;
}
