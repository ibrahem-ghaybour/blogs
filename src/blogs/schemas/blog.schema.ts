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

  @Prop({ required: true, type: Object })
  title: Object;

  @Prop({ required: false, type: String })
  avtar: string;
  // الإشارة إلى المجموعة التي تنتمي إليها المدونة
  @Prop({ type: Types.ObjectId, ref: 'Group', required: true })
  groupId: Group;
}

const BlogSchema = SchemaFactory.createForClass(Blog);
BlogSchema.set('toJSON', {
  virtuals: true,
  transform: (_: any, ret: any) => {
    ret.id = ret._id.toString(); // إضافة `id`
    delete ret._id; // حذف `_id`
  },
});

export { BlogSchema };
