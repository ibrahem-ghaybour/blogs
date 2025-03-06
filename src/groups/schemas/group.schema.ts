import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Blog } from '../../blogs/schemas/blog.schema';

@Schema({ collection: 'groups', timestamps: true })
export class Group extends Document {
  @Prop({ required: true, type: String })
  name: string;

  // قائمة تحتوي على جميع المدونات المرتبطة بهذه المجموعة
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }] })
  blogs: Blog[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
