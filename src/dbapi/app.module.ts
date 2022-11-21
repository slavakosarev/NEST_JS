import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { Posts } from './database/entities/post.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { AuthController } from './auth/auth.controller';
import { RolesController } from './roles/roles.controller';
import { SessionsModule } from './modules/sessions/sessions.module';
import { User } from './database/entities/user.entity';
import { UsersRoles } from './database/entities/users-roles.entity';
import { Role } from './database/entities/role.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, UsersRoles, Role]),
    Posts,
    AuthModule,
    RolesModule,
    SessionsModule,
  ],
  controllers: [AppController, AuthController, RolesController],
  providers: [AppService],
})
export class AppModule {}
