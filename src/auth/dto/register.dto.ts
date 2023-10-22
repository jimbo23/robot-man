import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const registerSchema = z
  .object({
    username: z.string(),
    password: z.string().min(8, 'Min length 8 chars!'),
    confirmPassword: z.string().min(8, 'Min length 8 chars!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
  });

export class RegisterDto extends createZodDto(registerSchema) {}
