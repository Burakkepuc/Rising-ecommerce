import { Controller, Get, UseGuards, Put, Body, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateBalanceDto } from 'src/auth/dto/update-balance.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const userId = req.user.userId;
    return this.userService.getProfile(userId);
  }

  @UseGuards(AuthGuard)
  @Put('update-balance')
  updateBalance(
    @Body() updateBalanceDto: UpdateBalanceDto,
    @Request() req,
  ): Promise<number> {
    const userId = req.user.userId;
    return this.userService.updateBalance(userId, updateBalanceDto.amount);
  }
}
