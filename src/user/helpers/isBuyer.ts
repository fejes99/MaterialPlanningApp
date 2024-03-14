import { type User } from 'wasp/entities';
import { UserRole } from '../types/UserRole';

export const isBuyer = (user: User | null | undefined) => user && user.role === UserRole.Buyer;
