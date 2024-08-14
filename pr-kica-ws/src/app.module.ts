import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './persistence/typeorm-config.service';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { LecturesModule } from './lectures/lectures.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    CoursesModule,
    StudentsModule,
    UsersModule,
    TeachersModule,
    LecturesModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
