import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const updateRobotSchema = z
  .object({
    name: z.string(),
    model: z.string(),
    manufacturing_date: z.string().or(z.date()),
    status: z.enum(['active', 'inactive', 'maintenance']),
    current_location: z.string(),
  })
  .partial();

export class UpdateRobotDto extends createZodDto(updateRobotSchema) {}
