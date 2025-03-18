import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;
  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: false, type: Boolean })
  admin: boolean;

  @Prop({ type: String, required: false })
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
