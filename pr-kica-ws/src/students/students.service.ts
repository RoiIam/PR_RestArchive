import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Connection, Repository } from 'typeorm';
import { StudentsEntity } from './entities/student.entity';
import { UserRole } from '../users/entities/user.entity';
import { GlobalService } from '../global.service';
import { joinCourseDto } from '../courses/dto/joinCourseDto';
import { CoursesEntity } from '../courses/entities/course.entity';
import { map } from 'rxjs';

@Injectable()
export class StudentsService {
  private _studentsRepository: Repository<StudentsEntity>;
  private _coursesRepository: Repository<CoursesEntity>;
  constructor(private _connection: Connection) {
    this._studentsRepository = this._connection.getRepository(StudentsEntity);
    this._coursesRepository = this._connection.getRepository(CoursesEntity);
  }
  async create(createStudentDto: CreateStudentDto) {
    // == creates a new entity instance ==
    const newStudent = this._studentsRepository.create();

    newStudent.firstName = createStudentDto.firstName;
    newStudent.lastName = createStudentDto.lastName;
    newStudent.email = createStudentDto.email;
    newStudent.role = UserRole.Student;

    // == saves the course to db ==
    await this._studentsRepository.save(newStudent);
    return newStudent;
    //return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all students`;
  }

  async findUser(id: string) {
    //console.log(this._connection.getRepository(StudentsEntity));
    // const repo = this._connection.getRepository(StudentsEntity);
    // return repo.find();
    const result = await this._studentsRepository
      .createQueryBuilder()
      .where({ email: id })
      .getMany();
    if (result[0] != undefined) {
      GlobalService.loggedUser = result[0];
      GlobalService.role = UserRole.Student;
      return result;
    } else {
      throw new HttpException('Error User not found', HttpStatus.NOT_FOUND);
      return;
    }
  }
  async findOne(e: string) {
    return await this._studentsRepository.findOne({ where: { email: e } });

    //return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  async remove(e: string) {
    const del = await this._studentsRepository.findOne({ where: { email: e } });
    this._studentsRepository.delete(del);
    //return `This action removes a #${id} student`;
  }

  async joinCourse(jjoinCourseDto: joinCourseDto) {
    const courseToJoin = await this._coursesRepository.findOne({
      where: { slug: jjoinCourseDto.courseSlug },
    });
    const studentToJoin = await this._studentsRepository.findOne({
      where: { email: jjoinCourseDto.studentEmail },
    });
    console.log('searching...');
    console.log(studentToJoin);
    console.log(courseToJoin);

    //const course2 = await this._coursesRepository.findOne({ where: {id:}})
    return await this._studentsRepository
      .createQueryBuilder()
      .relation(StudentsEntity, 'courses')
      .of(studentToJoin)
      .add(courseToJoin);

    //failed attemnpts
    //await studentToJoin.courses.push(courseToJoin);
    //record.genres = genres.map((id) => ({ id } as Genre));
    //courseToJoin.students.map((id) => ({ studentToJoin.id } as StudentsEntity));
    //courseToJoin.students.push(studentToJoin);
    //await this._coursesRepository.save(courseToJoin);
    //return await this._studentsRepository.update(studentToJoin.id, studentToJoin);

    //const realt = await this._coursesRepository.createQueryBuilder().relation(CoursesEntity, 'students').of(courseToJoin).loadMany();
    //await this._coursesRepository.createQueryBuilder().relation(CoursesEntity, 'students').of(courseToJoin)
    //    .addAndRemove(courseToJoin.students, realt);

    //await this._coursesRepository.update(courseToJoin.id, courseToJoin);
    /*await this._coursesRepository
      .createQueryBuilder()
      .relation(CoursesEntity, 'students')
      .of(courseToJoin)
      .add(studentToJoin.id);
    */
    //const record = this._studentsRepository.create(others);
    //courseToJoin.students = [{id: studentToJoin.id}] ;
    //jjoinCourseDto.studentEmail
    //return courseToJoin;
  }
  async unrollCourse(jjoinCourseDto: joinCourseDto) {
    const courseToJoin = await this._coursesRepository.findOne({
      where: { slug: jjoinCourseDto.courseSlug },
    });
    const studentToJoin = await this._studentsRepository.findOne({
      where: { email: jjoinCourseDto.studentEmail },
    });
    console.log('searching to del...');
    console.log(studentToJoin);
    console.log(courseToJoin);

    //const course2 = await this._coursesRepository.findOne({ where: {id:}})
    return await this._studentsRepository
      .createQueryBuilder()
      .relation(StudentsEntity, 'courses')
      .of(studentToJoin)
      .remove(courseToJoin);
  }
}
