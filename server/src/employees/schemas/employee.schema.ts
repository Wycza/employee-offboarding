import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Equipment, EquipmentSchema } from './equipment.schema';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ _id: false })
export class Employee {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [EquipmentSchema], default: [] })
  equipments: Equipment[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
