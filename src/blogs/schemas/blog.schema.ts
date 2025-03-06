import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Group } from 'src/groups/schemas/group.schema';
@Schema({
  collection: 'blogs',
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Blog extends Document {
  @Prop({ required: true, type: String })
  userName: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: false, type: String })
  avtar: string;
// الإشارة إلى المجموعة التي تنتمي إليها المدونة
  @Prop({ type: Types.ObjectId, ref: 'Group', required: true })
  groupId: Group;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
