import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { Type } from 'class-transformer';
import { Receipt } from 'src/database/entities/receipts.entity';
import {  TypeOrmModule } from '@nestjs/typeorm';
import {NotificationsModule} from 'src/notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt]), NotificationsModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService]
})
export class ReceiptsModule {}
