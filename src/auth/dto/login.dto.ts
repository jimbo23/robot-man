import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const loginSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .required();

export class LoginDto extends createZodDto(loginSchema) {}
