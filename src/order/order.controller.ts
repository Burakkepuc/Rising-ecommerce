import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req,
  ): Promise<Order> {
    const userId = req.user.userId;
    return this.orderService.createOrder(createOrderDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get('get-orders')
  async getOrders(@Request() req): Promise<Order[]> {
    const userId = req.user.userId;
    return this.orderService.getOrders(userId);
  }
}
