import { Injectable, Logger } from '@nestjs/common';
import { AgendaService } from './agenda/agendas.service';
// import { AgendaService } from './agenda/agendas.service';

@Injectable()
export class AppService {

  constructor(private readonly agendaService: AgendaService) {
    this.agendaService.handleCron();
  }
}
