import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { BlogService } from './services/blog.service';
import { BlogController } from './controllers/blog.controller';
import { GroupModule } from 'src/groups/groups.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    GroupModule,
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
