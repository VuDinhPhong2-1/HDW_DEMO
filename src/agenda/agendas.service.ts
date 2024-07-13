import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as mongoose from 'mongoose';
const Agenda = require('agenda');

@Injectable()
export class AgendaService {
  private readonly logger = new Logger(AgendaService.name);
  private agenda: any;

  constructor() {
    this.agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });
    this.defineDatabaseHealthCheckJob();
  }

  private defineDatabaseHealthCheckJob() {
    // Định nghĩa một công việc mới với tên 'check-database-connection'
    this.agenda.define('check-database-connection', async (job) => {
      try {
        // Kiểm tra kết nối cơ sở dữ liệu
        const isConnected = await this.checkDatabaseConnection();

        // Nếu kết nối thành công, ghi log thông báo rằng kết nối cơ sở dữ liệu khỏe mạnh
        if (isConnected) {
          this.logger.debug('Database connection is healthy.');
        } else {
          // Nếu kết nối thất bại, ghi log thông báo rằng kết nối cơ sở dữ liệu bị lỗi
          this.logger.error('Database connection is down!');
        }
      } catch (error) {
        // Ghi log nếu có lỗi trong quá trình kiểm tra kết nối cơ sở dữ liệu
        this.logger.error(`Error checking database connection: ${error}`);
      }
    });
  }

  private async checkDatabaseConnection(): Promise<boolean> {
    try {
      // Thực hiện kết nối tới MongoDB
      await mongoose.connect(process.env.MONGODB_URI);
      // Nếu kết nối thành công, trả về true
      return mongoose.connection.readyState === 1;
    } catch (error) {
      // Nếu kết nối thất bại, ghi log lỗi và trả về false
      this.logger.error(`Error connecting to database: ${error.message}`);
      return false;
    } finally {
      // Đóng kết nối sau khi kiểm tra
      await mongoose.disconnect();
    }
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
