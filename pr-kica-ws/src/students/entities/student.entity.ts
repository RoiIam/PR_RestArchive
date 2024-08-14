import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  TableForeignKey,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
//import {UsersEntity} from "../../users/entities/user.entity";
import { UsersEntity } from '../../users/entities/user.entity';
import { CoursesEntity } from '../../courses/entities/course.entity';
import { ProfileEntity } from '../../profile/entities/profile.entity';

@Entity('students')
export class StudentsEntity extends UsersEntity {
  @PrimaryColumn({ generated: true })
  id: number;

  //@OneToOne(() => UsersEntity, (user) => user.Stu) // specify inverse side as a second parameter
  //user: UsersEntity;

  //@TableForeignKey(UsersEntity.user_type)
  user_type: number; // 0 admin, 1 student, 2 teacher

  @ManyToMany((type) => CoursesEntity, (course) => course.students)
  courses: CoursesEntity[];

  @OneToOne(() => ProfileEntity)
  profile: ProfileEntity;

  // signed in courses,
}
