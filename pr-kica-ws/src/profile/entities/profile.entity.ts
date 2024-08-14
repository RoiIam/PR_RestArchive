import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { StudentsEntity } from '../../students/entities/student.entity';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryColumn({ generated: true })
  id: number;

  @OneToOne(() => StudentsEntity)
  @JoinColumn()
  student: StudentsEntity;

  @Column()
  photoUrl: string;

  @Column()
  jobTitle: string;

  @Column()
  personalWebsite: string;

  @Column()
  biography: string;
}
