import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ErrorMessages } from "src/constant/errorMessages";

export class RefreshTokenDto {
    @ApiProperty({ example: 'eg: eylgs---', required: true })
    @IsString({ message: ErrorMessages.validation.IS_STRING })
    @IsNotEmpty({ message: ErrorMessages.validation.IS_NOT_EMPTY })
    token: string;
}