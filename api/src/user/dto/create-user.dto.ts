import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email().max(255).min(6),
  name: z.string().max(255).min(2),
  lastName: z.string().max(255).min(2),
  document: z.string().max(14).min(11),
  password: z.string().max(80).min(8),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
