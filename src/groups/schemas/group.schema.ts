import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import * as mongoose from 'mongoose';
// import { Blog } from '../../blogs/schemas/blog.schema';

@Schema({
  versionKey: false,
  collection: 'groups',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
// @indexedDB({ name: 'name', unique: true })
export class Group extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;
  // قائمة تحتوي على جميع المدونات المرتبطة بهذه المجموعة
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }] })
  // blogs: Blog[];
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String })
  icon: string;
}

const GroupSchema = SchemaFactory.createForClass(Group);

//  Virtual باسم `id` يساوي `_id`
// GroupSchema.set('toJSON', {
//   virtuals: true,
//   transform: (_: any, ret: any) => {
//     ret.id = ret._id.toString(); // إضافة `id`
//     delete ret._id; // حذف `_id`
//   },
// });
// GroupSchema.index({ name: 'text', description: 'text' });
export { GroupSchema };
