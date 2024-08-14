import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CoursesEntity } from '../../courses/entities/course.entity';

@Entity('lectures')
export class LecturesEntity {
  @PrimaryColumn({ generated: true })
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  description: string;

  @Column()
  title: string;

  @Column()
  videoUrl: string;

  @ManyToOne((type) => CoursesEntity, (course) => course.lectures, {onDelete: 'CASCADE'})
  course: CoursesEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
