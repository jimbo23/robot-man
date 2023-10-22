import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { username: 'john' },
    update: {},
    create: {
      username: 'john',
      password: 'admin',
      roles: ['admin', 'operator'],
    },
  });

  const operator = await prisma.user.upsert({
    where: { username: 'john' },
    update: {},
    create: {
      username: 'ray',
      password: 'operator',
      roles: ['operator'],
    },
  });

  console.log({ admin, operator });

  const robots = await prisma.robot.createMany({
    data: [
      {
        name: 'Robot 1',
        current_location: 'Mitsubishi HQ',
        manufacturing_date: new Date(),
        model: 'Mitsubishi',
      },
      {
        name: 'Robot 2',
        current_location: 'Tesla HQ',
        manufacturing_date: new Date(),
        model: 'Tesla',
        status: 'inactive',
      },
    ],
  });
  console.log({ robots });

  const companies = await prisma.company.createMany({
    data: [
      {
        name: 'Company A',
        address: 'Woodleight Residence A',
      },
      {
        name: 'Company B',
        address: 'Woodleight Residence B',
      },
    ],
  });

  console.log({ companies });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
