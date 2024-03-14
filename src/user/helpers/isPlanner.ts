import { type User } from 'wasp/entities';
import { UserRole } from '../types/UserRole';

export const isPlanner = (user: User | null | undefined) => user && user.role === UserRole.Planner;
