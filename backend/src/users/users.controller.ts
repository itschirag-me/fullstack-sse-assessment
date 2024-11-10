import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { QueryParamDto } from 'src/dtos/query-param.dto';
import { ILike } from 'typeorm';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SuccessMessages } from 'src/constant/successMessages';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBearerAuth()
  @Get()
  getUsers(@Query() queryParamDto: QueryParamDto) {
    const page = parseInt(queryParamDto.page);
    const limit = parseInt(queryParamDto.limit);

    const skip = (page - 1) * limit;
    const take = limit;

    const data = this.usersService.find({
      take,
      skip,
      order: queryParamDto.sort ? { [queryParamDto.sort]: queryParamDto.order } : undefined,
    });

    return {
      data,
      message: SuccessMessages.user.FETCHED,
    }
  }
}
