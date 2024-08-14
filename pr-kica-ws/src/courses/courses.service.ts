import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository, Connection } from 'typeorm';
import { CoursesEntity } from './entities/course.entity';
import { joinCourseDto } from './dto/joinCourseDto';
import { GlobalService } from '../global.service';
import { TeachersService } from '../teachers/teachers.service';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class CoursesService {
  private _coursesRepository: Repository<CoursesEntity>;
  constructor(
    private _connection: Connection,
    private teachersService: TeachersService,
  ) {
    this._coursesRepository = this._connection.getRepository(CoursesEntity);
  }
  async create(createCourseDto: CreateCourseDto) {
    // == creates a new entity instance ==
    const newCourse = this._coursesRepository.create();

    newCourse.title = createCourseDto.title;
    newCourse.slug = createCourseDto.slug;
    newCourse.description = createCourseDto.description;
    newCourse.teacher = GlobalService.loggedUser; //works only if teacher is logged in, need to assign key to him too
    await this.teachersService
      .findUser(GlobalService.loggedUser.email)
      .then((r) => (newCourse.teacher = r[0]));

    console.log('lalala');
    console.log(newCourse.teacher);
    //this await didnt work well
    //await this._coursesRepository
    //.createQueryBuilder()
    //.where({ email: GlobalService.loggedUser.email })
    //.getMany();

    // == saves the course to db ==
    await this._coursesRepository.save(newCourse);
    return newCourse;
    //return 'This action adds a new course';
  }

  async findAll() {
    console.log(this._connection);
    return await this._coursesRepository.find();
    //return `This action returns all courses`;
  }

  async findOne(s: string) {
    const result = await this._coursesRepository.findOne({
      where: { slug: s },});
      //await this._coursesRepository
        //.createQueryBuilder()
        //.where({  slug: s })
        //.getOne();
    //console.log(result)

    if (result != undefined) {
      return result;
    } else {
      throw new HttpException('Error course not found', HttpStatus.NOT_FOUND);
      //return;
    }
    //return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(s: string) {
    const del = await this._coursesRepository.findOne({
      where: { slug: s },});
    this._coursesRepository.remove(del);
  }



}
