// agenda/agenda.module.ts
import { Module } from '@nestjs/common';
import { AgendaService } from 'nestjs-agenda';


@Module({
  providers: [AgendaService],
  exports: [AgendaService],
})
export class AgendaModule {}
