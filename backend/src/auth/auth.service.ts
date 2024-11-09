import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { BaseService } from 'src/services/base.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService extends BaseService<UserEntity> {
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>, private readonly jwtService: JwtService) {
    super(repository);
  }

  async login(payload: LoginDto) {

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
