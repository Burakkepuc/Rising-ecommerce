import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/user.entitiy';
import { UserRole } from 'src/enum/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async getProfile(userId: number) {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      return 'User not found';
    }

    return user;
  }

  async updateBalance(userId: number, amount: number): Promise<number> {
    const user = await this.userModel.findByPk(userId);

    if (user) {
      user.balance += amount;
      await user.save();
    }
    return user.balance;
  }

  async updateUserRole(userId: number, role: UserRole): Promise<boolean> {
    const user = await this.userModel.findByPk(userId);

    //Burada userId'yi el ile verdiğimiz için, user not kontrolünü başta yapıyoruz.
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    try {
      user.role = role;
      await user.save();
      return true;
    } catch (error) {
      return error.message;
    }
  }
}
