// app.module.ts
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AgendaModule } from './agenda/agenda.module';
import { Module, Logger } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    AgendaModule,
  ],
  providers: [
    AppService,
    // {
    //   provide: Logger,
    //   useValue: new Logger('Global'),
    // },
  ],
})
export class AppModule {}
