import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TransactionType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ required: true })
  userId: string; 

  @Prop({ required: true, enum: TransactionType })
  type: TransactionType;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  source: string;

  @Prop({ default: Date.now })
  date: Date;

  @Prop()
  description?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);