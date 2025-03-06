import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blogs/blogs.module';
import { GroupModule } from './groups/groups.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blogs'),
    BlogModule,
    GroupModule,
  ],
})
export class AppModule {}
