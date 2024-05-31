import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from './order.entity';
import { User } from './user.entitiy';
import { OrderStatus } from 'src/enum/order-status.enum';

@Table({ tableName: 'Service' })
export class Service extends Model<Service> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @Column
  serviceName: string;

  @Column
  serviceDescription: string;

  @Column({
    type: 'enum',
    values: Object.values(OrderStatus),
  })
  status: OrderStatus;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Order)
  order: Order;
}
