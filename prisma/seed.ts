import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash1 = await bcrypt.hash('123456', 10);
  const passwordHash2 = await bcrypt.hash('thaonhi', 10);

  const user1 = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      name: 'Admin',
      password: passwordHash1,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: 'thaonhi' },
    update: {},
    create: {
      username: 'thaonhi',
      name: 'Phòng khám Thảo Nhi',
      password: passwordHash2,
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
