import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MongooseModule.forRoot('mongodb://db:27017/employeeDB'), EmployeesModule],
})
export class AppModule {}
