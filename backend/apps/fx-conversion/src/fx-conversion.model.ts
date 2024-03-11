import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type FxConversionDocument = HydratedDocument <FxConversion>
@Schema()
export class FxConversion  {
  @Prop({ required: true })
  sourceCurrency: string;

  @Prop({ required: true })
  destinationCurrency: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const FxConversionSchema = SchemaFactory.createForClass(FxConversion);
