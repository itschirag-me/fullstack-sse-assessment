import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsNumberString, IsString } from "class-validator";
import { ErrorMessages } from "src/constant/errorMessages";
import SortOrder from "src/enums/sort-order.enum";

export class QueryParamDto {
    @ApiProperty({ example: 1, required: false, default: 1 })
    @IsNumberString({}, { message: ErrorMessages.validation.IS_NUMBER_STRING })
    page: string = "1";

    @ApiProperty({ example: 10, required: false, default: 10 })
    @IsNumberString({}, { message: ErrorMessages.validation.IS_NUMBER_STRING })
    limit: string = "10";

    @ApiProperty({ example: 'createdAt', required: false, default: '' })
    @IsString({ message: ErrorMessages.validation.IS_STRING })
    sort: string = 'createdAt';

    @ApiProperty({ example: SortOrder.ASC, required: false, default: SortOrder.ASC })
    @IsEnum(SortOrder)
    order: SortOrder = SortOrder.ASC;
}