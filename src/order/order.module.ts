import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserModule } from 'src/user/user.module';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entitiy';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from 'src/entities/service.entity';

@Module({
  imports: [SequelizeModule.forFeature([Order, User, Service])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
