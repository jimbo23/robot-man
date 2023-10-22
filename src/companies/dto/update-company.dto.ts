import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const updateCompanySchema = z
  .object({
    name: z.string(),
    address: z.string(),
  })
  .partial();

export class UpdateCompanyDto extends createZodDto(updateCompanySchema) {}
