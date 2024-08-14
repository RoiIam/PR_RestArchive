import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../users/roles.guard';
import { TeachersModule } from '../teachers/teachers.module';
import { LecturesModule } from '../lectures/lectures.module';
import { TeachersService } from '../teachers/teachers.service';
import { LecturesService } from '../lectures/lectures.service';

@Module({
  //imports: [LecturesModule],
  controllers: [CoursesController],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
    CoursesService,
    TeachersService,
    LecturesService,
  ],
})
export class CoursesModule {}
