import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Order } from './order.entity';
import { Service } from './service.entity';
import { UserRole } from 'src/enum/user-role.enum';
@Table({ tableName: 'User' })
export class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: 0 })
  balance: number;

  @Column({ defaultValue: UserRole.USER })
  role: UserRole;

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => Service)
  services: Service[];
}
