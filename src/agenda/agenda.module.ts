// agenda/agenda.module.ts
import { Module } from '@nestjs/common';
import { AgendaService } from './agendas.service';


@Module({
  providers: [AgendaService],
  exports: [AgendaService],
})
export class AgendaModule {}
