import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public/public.decorator';
import { SuccessMessages } from './constant/successMessages';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health')
  @Public()
  getHealth() {
    const data = this.appService.getHealth();
    return {
      code: HttpStatus.OK,
      message: SuccessMessages.health.CHECKED,
      data,
    };
  }
}
