import { Module } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller';
import {CoursesModule} from "../courses/courses.module";
import {CoursesService} from "../courses/courses.service";
import {TeachersService} from "../teachers/teachers.service";

@Module({
  imports: [CoursesModule],
  controllers: [LecturesController],
  providers: [LecturesService,TeachersService , CoursesService], //why do i need this here?
})
export class LecturesModule {}
