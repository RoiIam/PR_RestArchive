import {
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany, ManyToOne, OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import {StudentsEntity} from "../../students/entities/student.entity";
import {TeachersEntity} from "../../teachers/entities/teacher.entity";
import {LecturesEntity} from "../../lectures/entities/lecture.entity";

@Entity('courses')
export class CoursesEntity {
  @PrimaryColumn({ generated: true })
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  description: string;

  @Column()
  title: string;

  @ManyToMany(() => StudentsEntity, (student) => student.courses, {
    cascade: true,
  })
  @JoinTable()
  students: StudentsEntity[];

  @ManyToOne((type) => TeachersEntity, (teacher) => teacher.courses, {
    cascade: true,
  })
  teacher: TeachersEntity;

  @OneToMany((type) => LecturesEntity, (lecture) => lecture.course, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  lectures: LecturesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
