import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum UserRole {
  Admin = 'admin',
  Student = 'student',
  Teacher = 'teacher',
  User = 'user',
}

//import { StudentsEntity } from '../../students/entities/student.entity';
//import { UsersEntity } from '../../users/entities/user.entity';
//@Entity('users')
export abstract class UsersEntity {
  @PrimaryColumn({ generated: true })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;
  //@OneToOne((type) => StudentsEntity)
  //@JoinColumn()
  //attached: StudentsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
