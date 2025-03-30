import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
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
  title: string;

  @Prop({ required: true, type: String })
  htmlText: string;

  @Prop({ required: false, type: String })
  avatar: string;
  // الإشارة إلى المجموعة التي تنتمي إليها المدونة
  @Prop({ required: false, type: String })
  groupId: string;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, type: String })
  userName: string;
}

const BlogSchema = SchemaFactory.createForClass(Blog);
// BlogSchema.set('toJSON', {
//   virtuals: true,
//   transform: (_: any, ret: any) => {
//     ret.id = ret._id.toString(); // إضافة `id`
//     delete ret._id; // حذف `_id`
//   },
// });
// BlogSchema.index({ title: 1, htmlText: 1 });
export { BlogSchema };
