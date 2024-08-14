import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {joinCourseDto} from "../courses/dto/joinCourseDto";
import {UserRole} from "../users/entities/user.entity";
import {Roles} from "../users/roles.decorator";

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto).catch((error) => {
      throw new HttpException('Error Creating entry', HttpStatus.NOT_FOUND);
    });
  }

  @Post('/c')
  @Roles(UserRole.Student)
  join(@Body() jjoinCourseDto: joinCourseDto) {
    return this.studentsService.joinCourse(jjoinCourseDto).catch((error) => {
      throw new HttpException('Error joining course', HttpStatus.NOT_FOUND);
    });
  }

  @Post('/c/unroll')
  @Roles(UserRole.Student)
  testjoin(@Body() jjoinCourseDto: joinCourseDto) {
    return this.studentsService.unrollCourse(jjoinCourseDto).catch((error) => {
      throw new HttpException('Error joining course', HttpStatus.NOT_FOUND);
    });
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('auth/:id')
  findOne(@Param() params): any {
    console.log(params.id);
    //return '';
    return this.studentsService.findUser(params.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':email')
  remove(@Param('email') id: string) {
    return this.studentsService.remove(id);
  }
}
