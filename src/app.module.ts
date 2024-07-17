// app.module.ts
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AgendaModule } from './agenda/agenda.module';
import { Module, Logger } from '@nestjs/common';
import { PetModule } from './pets/pet.module';
import { BullModule } from '@nestjs/bull';
import { TRANSCODE_QUEUE } from './comon/constants/constants';
import { TranscodeConsumer } from './transcode.consumer';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: TRANSCODE_QUEUE,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    AgendaModule,
    PetModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TranscodeConsumer,
    // {
    //   provide: Logger,
    //   useValue: new Logger('Global'),
    // },
  ],
})
export class AppModule {}
