import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blogs/blogs.module';
import { GroupModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';
import { AppWebSocket } from './app.websocket';
import { RolesModule } from './role/roles.module';
import { CommentModule } from './comments/comment.module';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blogs'),
    BlogModule,
    GroupModule,
    AuthModule,
    RolesModule,
    CommentModule,
  ],
  providers: [AppWebSocket],
  exports: [AppWebSocket],
})
export class AppModule {}
