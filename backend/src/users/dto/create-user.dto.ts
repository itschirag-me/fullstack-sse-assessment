import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';
import { ErrorMessages } from 'src/constant/errorMessages';

const APLHA_NAME_REGEX = /^[A-Za-z\s]*$/;

export class CreateUserDto {
  @ApiProperty({
    example: 'Chirag Raja',
    required: true,
    description: 'User name',
  })
  @IsString()
  @Matches(APLHA_NAME_REGEX, { message: ErrorMessages.validation.IS_ALPHA_NAME })
  @IsNotEmpty({ message: ErrorMessages.validation.IS_NOT_EMPTY })
  name: string;

  @ApiProperty({
    example: 'jg0Zi@example.com',
    required: true,
    description: 'User email',
  })
  @IsEmail({}, { message: ErrorMessages.validation.IS_EMAIL })
  @IsNotEmpty({ message: ErrorMessages.validation.IS_NOT_EMPTY })
  email: string;

  @ApiProperty({
    example: 'password',
    required: true,
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty({ message: ErrorMessages.validation.IS_NOT_EMPTY })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: ErrorMessages.validation.IS_STRONG_PASSWORD },
  )
  password: string;

  @ApiProperty({
    example: 'organization',
    required: true,
    description: 'User organization',
  })
  @IsString()
  @IsNotEmpty({ message: ErrorMessages.validation.IS_NOT_EMPTY })
  organization: string;
}
