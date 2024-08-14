import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  TableForeignKey,
  OneToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { UsersEntity } from '../../users/entities/user.entity';
import { CoursesEntity } from '../../courses/entities/course.entity';

@Entity('teachers')
export class TeachersEntity extends UsersEntity {
  @PrimaryColumn({ generated: true })
  id: number;

  @OneToMany((type) => CoursesEntity, (course) => course.teacher)
  courses: CoursesEntity[];

  // signed in courses,
}
