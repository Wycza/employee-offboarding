import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './schemas/employee.schema';
import { OffboardEmployeeQuery } from './models/queries.model';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('')
  listEmployee(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Get('/:id')
  findEmployee(@Param('id') id: string): Promise<Employee> {
    return this.employeesService.findEmployee(id);
  }

  @Post('/:id/offboard')
  offboard(@Param('id') id: string, @Body() query: OffboardEmployeeQuery): Promise<boolean> {
    return this.employeesService.offboard(id, query);
  }
}
