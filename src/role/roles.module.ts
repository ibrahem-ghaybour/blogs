import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';

@Module({
  imports: [],
  controllers: [RolesController],
  // exports: [MongooseModule], // Remove this line
})
export class RolesModule {}
