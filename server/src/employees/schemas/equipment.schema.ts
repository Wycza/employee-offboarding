import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Equipment {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
