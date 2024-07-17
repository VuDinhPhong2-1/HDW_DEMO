import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('apps')
@Controller('apps')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Post('transcode')
  async transcode() {
    return this.appService.transcode();
  }
}
