import { Controller, Get, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @Get('get-all-services')
  async getAllServices() {
    return this.serviceService.getAllServices();
  }
}
