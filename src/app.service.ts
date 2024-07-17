import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AgendaService } from './agenda/agendas.service';
import { InjectQueue } from '@nestjs/bull';
import { TRANSCODE_QUEUE } from './comon/constants/constants';
import { Queue } from 'bull';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly agendaService: AgendaService,
    @InjectQueue(TRANSCODE_QUEUE) private readonly transcodeQueue: Queue,
  ) {}

  async onModuleInit() {
    this.logger.log('Initializing AgendaService...');
    await this.agendaService.handleCron();
    this.logger.log('AgendaService initialized.');
  }

  async transcode() {
    await this.transcodeQueue.add({
      fileName: './file.mp3',
    });
  }
}
