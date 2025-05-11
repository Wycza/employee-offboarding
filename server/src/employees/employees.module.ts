import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesService } from './employees.service';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { EmployeesController } from './employees.controller';
import { EmployeesSeederController } from './employees-seeder.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])],
  controllers: [EmployeesController, EmployeesSeederController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
