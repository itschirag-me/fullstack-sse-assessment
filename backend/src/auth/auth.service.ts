import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ErrorMessages } from 'src/constant/errorMessages';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { SuccessMessages } from 'src/constant/successMessages';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/config/env.config';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  }

  /**
   * Registers a new user by validating the email's uniqueness and then
   * creating the user record.
   *
   * @param createUserDto - Data Transfer Object containing user details for registration.
   * @returns A promise that resolves to the created user.
   * @throws BadRequestException if a user with the same email already exists.
   */
  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.findOne({ where: { email: createUserDto.email } });

    if (user) {
      throw new BadRequestException(ErrorMessages.user.ALREADY_EXISTS);
    }

    return this.userService.create(createUserDto);
  }

  /**
   * Authenticates a user by verifying email and password, then generates a JWT if valid.
   *
   * @param loginDto - Data Transfer Object containing login credentials.
   * @returns A promise that resolves to an object containing the JWT.
   * @throws UnauthorizedException if the credentials are invalid.
   */
  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne({ where: { email: loginDto.email } });

    if (!user) {
      throw new UnauthorizedException(ErrorMessages.auth.INVALID_CREDENTIALS);
    }

    const isMatch = await user.comparePassword(loginDto.password);

    if (!isMatch) {
      throw new UnauthorizedException(ErrorMessages.auth.INVALID_CREDENTIALS);
    }

    const payload = { email: user.email, sub: user.id };

    const refreshToken = this.jwtService.sign(payload, { secret: this.configService.get(Env.JWT_REFRESH_SECRET), expiresIn: this.configService.get(Env.JWT_REFRESH_EXPIRATION_TIME) });

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
  }

  /**
   * Refreshes an existing JWT by verifying the current token's validity
   * and issuing a new one with the same payload.
   *
   * @param token - The current JWT to be refreshed.
   * @returns An object containing the new JWT.
   * @throws UnauthorizedException if the token is invalid or expired.
   */
  refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      const { email, sub } = payload;

      const newToken = this.jwtService.sign({ email, sub });

      const refreshToken = this.jwtService.sign({ email, sub }, { secret: this.configService.get(Env.JWT_REFRESH_SECRET), expiresIn: this.configService.get(Env.JWT_REFRESH_EXPIRATION_TIME) });

      return {
        data: { access_token: newToken, refresh_token: refreshToken },
        message: SuccessMessages.auth.REFRESHED
      };
    } catch (error) {
      throw new UnauthorizedException(ErrorMessages.jwt.INVALID);
    }
  }
}
