import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Roles } from '../users/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Post()
  @Roles(UserRole.Teacher)
  create(@Body() createLectureDto: CreateLectureDto) {
    return this.lecturesService.create(createLectureDto);
  }

  @Get()
  findAll() {
    return this.lecturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lecturesService.findOne(id);
  }
  //get course lectures
  @Get('c/:courseSlug')
  findLectures(@Param('courseSlug') id: string) {
    console.log(id);
    return this.lecturesService.findLecturesByCourse(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLectureDto: UpdateLectureDto) {
    return this.lecturesService.update(+id, updateLectureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lecturesService.remove(id);
  }
}
