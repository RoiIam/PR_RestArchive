import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeachersService } from './teachers.service'; //uhh
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post() //should be post tbh
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get('auth/:id')
  findOne(@Param() params): any {
    console.log(params.id);
    return this.teachersService.findUser(params.id);
  }
  @Get('courses/')
  findOwn(@Param() params): any {
    //console.log(params.id);
    return this.teachersService.findCreatedCourses();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(+id, updateTeacherDto);
  }

  @Delete(':email')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
