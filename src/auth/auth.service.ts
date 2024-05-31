import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entitiy';
import { CreateUserType } from 'src/utils/types';
import { hashSync, compareSync } from 'bcrypt';
import { LoginResponse } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  static register(newUser: CreateUserType) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly jwtService: JwtService) {}

  async register(userData: CreateUserType): Promise<User> {
    const { password, ...user } = userData;
    const hashedPassword = hashSync(password, 10);
    const newUser = await User.create({
      ...user,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) return { message: 'User Not Found' };

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return { message: 'Invalid Password' };

    const payload = { userId: user.id, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { user, token } as LoginResponse;
  }

  async validateUserByJwt(userId: number): Promise<User | null> {
    return await User.findOne({ where: { id: userId } });
  }
}
