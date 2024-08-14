import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles, ROLES_KEY } from '../users/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { GlobalService } from '../global.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    //const { user } =  context.switchToHttp().getRequest();
    //return requiredRoles.some((role) => user.roles?.includes(role));
    const roles = [GlobalService.role, null];
      console.log(roles);
      console.log(requiredRoles);
    //return requiredRoles.some((role) => roles?.includes(role));
    return requiredRoles.some((role) => GlobalService.role);
  }
}