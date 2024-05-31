import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/entities/order.entity';
import { Service } from 'src/entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service)
    private serviceModel: typeof Service,
  ) {}

  async getAllServices(): Promise<Service[]> {
    return this.serviceModel.findAll({ include: [Order] });
  }
}
