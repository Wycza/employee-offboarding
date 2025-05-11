import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schemas/employee.schema';
import { v4 } from 'uuid';
import { OffboardEmployeeQuery } from './models/queries.model';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findEmployee(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findOne({ id }).exec();

    if (!employee) {
      throw new NotFoundException(`Employee with ${id} not found `);
    }

    return employee;
  }

  async offboard(id: string, query: OffboardEmployeeQuery) {
    await this.employeeModel.updateOne({ id }, { $set: { status: 'Offboarded' } });

    return true;
  }

  async seedDB(): Promise<void> {
    await this.employeeModel.deleteMany();

    await this.employeeModel.insertMany([
      {
        id: v4(),
        name: 'Justine Owens',
        email: 'user1@tequipy.com',
        department: 'Sales',
        equipments: [
          { id: v4(), name: 'MacBook Pro' },
          { id: v4(), name: 'Xiaomi Mi 3' },
          { id: v4(), name: 'Dell 200XP' },
        ],
        status: 'Active',
      },
      {
        id: v4(),
        name: 'Gloria Rice',
        email: 'user2@tequipy.com',
        department: 'Sales',
        equipments: [{ id: v4(), name: 'MacBook Set' }],
        status: 'Active',
      },
      {
        id: v4(),
        name: 'Sianna Hutchings',
        email: 'user3@tequipy.com',
        department: 'Engineering',
        equipments: [{ id: v4(), name: "MacBook Pro '16" }],
        status: 'Active',
      },
      {
        id: v4(),
        name: 'Roza Horner',
        email: 'user4@tequipy.com',
        department: 'Marketing',
        equipments: [
          { id: v4(), name: 'MacBook Pro' },
          { id: v4(), name: 'Xiaomi Mi 3' },
          { id: v4(), name: 'Dell 200XP' },
        ],
        status: 'Active',
      },
      {
        id: v4(),
        name: 'Agata Bradley',
        email: 'user5@tequipy.com',
        department: 'Engineering',
        equipments: [{ id: v4(), name: 'MacBook Pro' }],
        status: 'Active',
      },
      {
        id: v4(),
        name: 'Wanda Goff',
        email: 'user6@tequipy.com',
        department: 'Engineering',
        equipments: [
          { id: v4(), name: 'MacBook Pro' },
          { id: v4(), name: 'Xiaomi Mi 3' },
          { id: v4(), name: 'Dell 200XP' },
        ],
        status: 'Offboarded',
      },
      {
        id: v4(),
        name: 'Amrita Blackmore',
        email: 'user7@tequipy.com',
        department: 'Marketing',
        equipments: [{ id: v4(), name: 'MacBook Set' }],
        status: 'Active',
      },
      {
        id: v4(),
        name: 'Ayman Hanson',
        email: 'user8@tequipy.com',
        department: 'Engineering',
        equipments: [{ id: v4(), name: "MacBook Pro '16" }],
        status: 'Offboarded',
      },
      {
        id: v4(),
        name: 'Simone Hardin',
        email: 'user9@tequipy.com',
        department: 'Engineering',
        equipments: [{ id: v4(), name: "MacBook Pro '16" }],
        status: 'Active',
      },
    ]);
  }
}
