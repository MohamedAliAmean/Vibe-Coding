import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectionDocument = Section & Document;

@Schema({ timestamps: true })
export class Section {
  @Prop({ required: true })
  idea: string;

  @Prop({ type: [String], required: true })
  sections: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
