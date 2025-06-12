export type UserRole = 'ADMIN' | 'STAFF' | 'EVENT_OWNER' | 'USER';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthUser extends User {
  isAuthenticated: boolean;
}

export interface Permission {
  action: 'create' | 'read' | 'update' | 'delete';
  resource: 'event' | 'user' | 'rsvp';
}

export const RolePermissions: Record<UserRole, Permission[]> = {
  ADMIN: [
    { action: 'create', resource: 'event' },
    { action: 'read', resource: 'event' },
    { action: 'update', resource: 'event' },
    { action: 'delete', resource: 'event' },
    { action: 'create', resource: 'user' },
    { action: 'read', resource: 'user' },
    { action: 'update', resource: 'user' },
    { action: 'delete', resource: 'user' },
    { action: 'read', resource: 'rsvp' },
    { action: 'update', resource: 'rsvp' },
  ],
  STAFF: [
    { action: 'create', resource: 'event' },
    { action: 'read', resource: 'event' },
    { action: 'update', resource: 'event' },
    { action: 'read', resource: 'user' },
    { action: 'read', resource: 'rsvp' },
    { action: 'update', resource: 'rsvp' },
  ],
  EVENT_OWNER: [
    { action: 'create', resource: 'event' },
    { action: 'read', resource: 'event' },
    { action: 'update', resource: 'event' },
    { action: 'read', resource: 'rsvp' },
    { action: 'update', resource: 'rsvp' },
  ],
  USER: [
    { action: 'read', resource: 'event' },
    { action: 'create', resource: 'rsvp' },
    { action: 'read', resource: 'rsvp' },
  ],
}; 