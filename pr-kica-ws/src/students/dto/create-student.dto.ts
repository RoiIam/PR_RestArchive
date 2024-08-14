import { UserRole } from '../../users/entities/user.entity';

export class CreateStudentDto {
  firstName: string;

  lastName: string;

  email: string;

  role: UserRole;
}
