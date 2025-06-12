import { Permission, UserRole, RolePermissions } from '../types/auth';

export const hasPermission = (
  userRole: UserRole,
  requiredPermission: Permission
): boolean => {
  const userPermissions = RolePermissions[userRole];
  return userPermissions.some(
    (permission) =>
      permission.action === requiredPermission.action &&
      permission.resource === requiredPermission.resource
  );
};

export const checkMultiplePermissions = (
  userRole: UserRole,
  requiredPermissions: Permission[]
): boolean => {
  return requiredPermissions.every((permission) =>
    hasPermission(userRole, permission)
  );
};

export const isAdmin = (role: UserRole): boolean => role === 'ADMIN';
export const isStaff = (role: UserRole): boolean => role === 'STAFF';
export const isEventOwner = (role: UserRole): boolean => role === 'EVENT_OWNER';
export const isAuthenticatedUser = (role: UserRole): boolean => role === 'USER';

export const canManageEvent = (role: UserRole): boolean => {
  return ['ADMIN', 'STAFF', 'EVENT_OWNER'].includes(role);
};

export const canViewEvent = (role: UserRole): boolean => {
  return true; // All roles can view events
};

export const canRSVP = (role: UserRole): boolean => {
  return true; // All authenticated users can RSVP
}; 