import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '../users/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { joinCourseDto } from './dto/joinCourseDto';
import { TeachersService } from '../teachers/teachers.service';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private teachersService: TeachersService,
  ) {}

  @Post()
  @Roles(UserRole.Teacher)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }
  /*student can join a class
  @Get('joinCourse')
  //@Roles(UserRole.Student, UserRole.Admin)
  applyStudent(@Body() msg: joinCourseDto) {
    //return this.coursesService.applyStudent(msg);
  }*/

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.coursesService.findOne(id);
  }

 /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }*/

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.coursesService.remove(slug);
  }
}
