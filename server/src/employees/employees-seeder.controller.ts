import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Response } from 'express';

@Controller('employees-seeder')
export class EmployeesSeederController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('')
  async seedDB(@Res() res: Response) {
    await this.employeesService.seedDB();

    res.status(HttpStatus.OK).json({ result: 'Database seeded!' });
  }
}
