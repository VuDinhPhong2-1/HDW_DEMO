import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Agenda from 'agenda';

@Injectable()
export class AgendaService {
  private readonly logger = new Logger(AgendaService.name);
  private agenda: Agenda;

  constructor() {
    this.agenda = new Agenda();
    this.agenda.database(process.env.MONGODB_URI);
    this.defineDatabaseHealthCheckJob();
  }

  private defineDatabaseHealthCheckJob() {
    this.agenda.define('check-database-connection', async (job) => {
      try {
        const isConnected = await this.checkDatabaseConnection();
        if (isConnected) {
          this.logger.debug('Database connection is healthy.');
        } else {
          this.logger.error('Database connection is down!');
        }
      } catch (error) {
        this.logger.error(`Error checking database connection: ${error}`);
      }
    });
  }

  private async checkDatabaseConnection(): Promise<boolean> {
    // Thực hiện logic kiểm tra kết nối cơ sở dữ liệu ở đây
    // Ví dụ:
    // const connection = await mongoose.connect('mongodb://localhost:27017/mydatabase');
    // return connection.isConnected;
    return true; // Đây là ví dụ, bạn cần thay thế bằng logic kiểm tra thực tế của bạn
  }

  @Cron(CronExpression.EVERY_MINUTE) // Chạy mỗi phút
  async handleCron() {
    await this.agenda.start();
    await this.agenda.every('1 minute', 'check-database-connection');
  }

  async stop() {
    await this.agenda.stop();
  }
}
