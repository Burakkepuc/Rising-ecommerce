import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entitiy';
import { Service } from './service.entity';

@Table({ tableName: 'Order' })
export class Order extends Model<Order> {
  @Column
  productName: string;

  @Column
  quantity: number;

  @Column
  price: number;

  @Column
  address: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Service)
  services: Service[];
}
