import { Controller, Get } from '@nestjs/common';

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

@Controller('roles')
export class RolesController {
  private roles: Role[] = [
    {
      id: 'admin',
      name: 'Administrator',
      permissions: [
        'users:read',
        'users:write',
        'users:delete',
        'settings:read',
        'settings:write',
        'reports:read',
        'reports:write',
      ],
    },
    {
      id: 'manager',
      name: 'Manager',
      permissions: [
        'users:read',
        'users:write',
        'reports:read',
        'reports:write',
      ],
    },
    {
      id: 'user',
      name: 'Regular User',
      permissions: ['users:read', 'reports:read'],
    },
    {
      id: 'guest',
      name: 'Guest',
      permissions: ['users:read'],
    },
  ];

  @Get()
  async getRoles(): Promise<Role[]> {
    return this.roles;
  }
}
