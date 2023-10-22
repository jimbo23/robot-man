import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const createRobotSchema = z.object({
  name: z.string().describe('test'),
  model: z.string(),
  manufacturing_date: z.date().or(z.string()),
  status: z.enum(['active', 'inactive', 'maintenance']).optional(),
  current_location: z.string(),
});

export class CreateRobotDto extends createZodDto(createRobotSchema) {}
