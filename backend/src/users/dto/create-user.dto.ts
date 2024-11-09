import {
    IsAlpha,
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
} from 'class-validator';
import { ErrorMessages } from 'src/constant/errorMessages';

export class CreateUserDto {
    @IsString()
    @IsAlpha('en-IN', { message: ErrorMessages.validation.IS_ALPHA_NAME })
    @IsNotEmpty({ message: ErrorMessages.validation.IS_NOT_EMPTY })
    name: string;

    @IsEmail({}, { message: ErrorMessages.validation.IS_EMAIL })
    @IsNotEmpty({ message: ErrorMessages.validation.IS_NOT_EMPTY })
    email: string;

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

    @IsString()
    @IsNotEmpty({ message: ErrorMessages.validation.IS_NOT_EMPTY })
    organization: string;
}
