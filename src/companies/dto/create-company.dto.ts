import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const createCompanySchema = z.object({
  name: z.string(),
  address: z.string(),
});

export class CreateCompanyDto extends createZodDto(createCompanySchema) {}
