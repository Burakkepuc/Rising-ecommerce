import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from 'src/entities/service.entity';
import { Order } from 'src/entities/order.entity';

@Module({
  imports: [SequelizeModule.forFeature([Service, Order])],

  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
