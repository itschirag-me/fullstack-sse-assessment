import { IsEmail } from 'class-validator';
import { ErrorMessages } from 'src/constant/errorMessages';

export class LoginDto {
    @IsEmail({}, { message: ErrorMessages.validation.IS_EMAIL })
    email: string;
}
