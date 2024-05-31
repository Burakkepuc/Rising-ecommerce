import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entitiy';
import { Order } from './entities/order.entity';
import { Service } from './entities/service.entity';
import { OrderModule } from './order/order.module';
import { ServiceModule } from './service/service.module';
require('dotenv').config();

@Module({
  imports: [
    JwtModule.register({
      secret: 'burak123',
      signOptions: { expiresIn: '1d' },
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'db/database.sqlite',
      autoLoadModels: true,
      synchronize: true,
      models: [User, Order, Service],
    }),
    UserModule,
    AuthModule,
    OrderModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {}
