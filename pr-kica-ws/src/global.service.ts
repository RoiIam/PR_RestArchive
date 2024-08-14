import { UserRole } from './users/entities/user.entity';

export class GlobalService {
  static loggedUser: any;
  static role: UserRole;
}
