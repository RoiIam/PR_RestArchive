import { UserRole } from '../../users/entities/user.entity';

export class CreateTeacherDto {
    firstName: string;

    lastName: string;

    email: string;

    role: UserRole;
}
