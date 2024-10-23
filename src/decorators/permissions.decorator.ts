// decorators/permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { PermissionNameType } from '../enums/permission-name-type.enum';

export const ROLES_KEY = 'permissions';
export const Permissions = (...permissions: PermissionNameType[]) =>
  SetMetadata(ROLES_KEY, permissions);
