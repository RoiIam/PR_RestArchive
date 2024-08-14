import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UserRole } from '../users/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { TeachersEntity } from './entities/teacher.entity';
import { GlobalService } from '../global.service';
import { CoursesEntity } from '../courses/entities/course.entity';

@Injectable()
export class TeachersService {
  private _teachersRepository: Repository<TeachersEntity>;
  private _coursesRepository: Repository<CoursesEntity>;
  constructor(private _connection: Connection) {
    this._teachersRepository = this._connection.getRepository(TeachersEntity);
  }
  async create(createTeacherDto: CreateTeacherDto) {
    // == creates a new entity instance ==
    const newTeacher = this._teachersRepository.create();

    newTeacher.firstName = createTeacherDto.firstName;
    newTeacher.lastName = createTeacherDto.lastName;
    newTeacher.email = createTeacherDto.email;
    newTeacher.role = UserRole.Teacher;

    // == saves the course to db ==
    await this._teachersRepository.save(newTeacher);
    return newTeacher;
    //return 'This action adds a new teacher';
  }

  findAll() {
    return `This action returns all teachers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }
  async findUser(id: string) {
    //console.log(this._connection.getRepository(StudentsEntity));
    // const repo = this._connection.getRepository(StudentsEntity);
    // return repo.find();
    const result = await this._teachersRepository
      .createQueryBuilder()
      .where({ email: id })
      .getMany();
    if (result[0] != undefined) {
      GlobalService.loggedUser = result[0];
      GlobalService.role = UserRole.Teacher;
      return result;
    } else {
      throw new HttpException('Error User not found', HttpStatus.NOT_FOUND);
      return;
    }
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }

  async findCreatedCourses() {
    // one way to do it:
    // const qb = await this._teachersRepository.find({ relations: ['courses'] }); //await this._teachersRepository
    const qb = await this._teachersRepository
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.course', 'teachers')
      //.getRawMany();
      //.select(["teachers"])
      .where({ email: GlobalService.loggedUser.email })
      .getMany();
    console.log(qb);
    return qb;
  }
}
