import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blogs/blogs.module';
import { GroupModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';
import { AppWebSocket } from './app.websocket';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blogs'),
    BlogModule,
    GroupModule,
    AuthModule,
  ],
  providers: [AppWebSocket],
  exports: [AppWebSocket],
})
export class AppModule {}
