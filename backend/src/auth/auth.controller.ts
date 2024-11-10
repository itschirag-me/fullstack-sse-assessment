import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/decorators/token/token.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SuccessMessages } from 'src/constant/successMessages';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  @Public()
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);

    return {
      message: SuccessMessages.auth.LOGGED_IN,
      data,
    }
  }

  @ApiBearerAuth()
  @Post('refresh')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.token);
  }

  @Post('signup')
  @Public()
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
