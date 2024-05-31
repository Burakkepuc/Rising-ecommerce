import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entitiy';
import { CreateOrderDto } from './dto/create-order.dto';
import { Service } from 'src/entities/service.entity';
import { OrderStatus } from 'src/enum/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Service)
    private serviceModel: typeof Service,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<Order> {
    const { productName, quantity, price, address } = createOrderDto;
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.balance < quantity * price) {
      throw new BadRequestException(
        ' Balance is not enough. Please update your balance',
      );
    }

    user.balance -= quantity * price;
    await user.save();

    const order = await this.orderModel.create({
      productName,
      quantity,
      price,
      address,
      userId: user.id,
    });

    await this.serviceModel.create({
      userId,
      orderId: order.id,
      serviceName: 'Order Processing',
      serviceDescription: 'Your order is being processed',
      status: OrderStatus.PENDING,
    });

    return order;
  }

  async getOrders(userId: number) {
    return this.orderModel.findAll({
      where: { userId },
      include: [{ model: User }],
    });
  }
}
