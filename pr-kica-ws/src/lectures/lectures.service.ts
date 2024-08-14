import { Get, Injectable, Param } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Connection, Repository } from 'typeorm';
import { LecturesEntity } from './entities/lecture.entity';
import { CoursesService } from '../courses/courses.service';
import { GlobalService } from '../global.service';
import { CoursesEntity } from '../courses/entities/course.entity';

@Injectable()
export class LecturesService {
  private _lecturesRepository: Repository<LecturesEntity>;
  private _courseRepository: Repository<CoursesEntity>;
  constructor(
    private _connection: Connection,
    private coursesService: CoursesService,
  ) {
    this._lecturesRepository = this._connection.getRepository(LecturesEntity);
    this._courseRepository = this._connection.getRepository(CoursesEntity);
  }
  async create(createLectureDto: CreateLectureDto) {
    // == creates a new entity instance ==
    const newLecture = this._lecturesRepository.create();

    newLecture.title = createLectureDto.title;
    newLecture.slug = createLectureDto.slug;
    newLecture.description = createLectureDto.description;
    newLecture.videoUrl = createLectureDto.url;
    await this.coursesService
      .findOne(createLectureDto.courseSlug) //find proper course to add the lecture to
      .then((r) => (newLecture.course = r)); //assign lecture to course

    //saves the lecture to db
    await this._lecturesRepository.save(newLecture);
    return newLecture;
    //return 'This action adds a new course';
  }

  async findLecturesByCourse(id: string) {
    let a = await this._courseRepository.findOne({where: {slug: id}}) //cant figure how to do it in one querybuilder so di this
    const qb = await this._lecturesRepository
      //.createQueryBuilder('course')
      //.leftJoinAndSelect('course.lecture', 'course')
        //.getRawMany(); //apparently this way doesnt work...
      .createQueryBuilder('lecture')
      .leftJoinAndSelect('lecture.course', 'lectures')
      //.getRawMany();
    .where({  course: a })
    .getMany();
    console.log(qb);
    return qb;
  }
  findAll() {
    return `This action returns all lectures`;
  }

  async findOne(id: string) {
    return await this._lecturesRepository.findOne({ where: { slug: id } });
    //return `This action returns a #${id} lecture`;
  }

  update(id: number, updateLectureDto: UpdateLectureDto) {
    return `This action updates a #${id} lecture`;
  }

  async remove(s: string) {
    const del = await this._lecturesRepository.findOne({
      where: { slug: s },});
    this._lecturesRepository.remove(del);
  }
}
