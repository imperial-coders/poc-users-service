import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const paul = await prisma.user.upsert({
    where: { email: 'paulatreides@caladan.com' },
    update: {},
    create: {
      email: 'paulatreides@caladan.com',
      firstName: 'Paul',
      lastName: 'Atreides',
      UserSettings: {
        create: {
          favoriteStarWarsCharacterSwapiId: '11',
        },
      },
    },
  });

  const leto = await prisma.user.upsert({
    where: { email: 'letoatreides@caladan.com' },
    update: {},
    create: {
      email: 'letoatreides@caladan.com',
      firstName: 'Leto',
      lastName: 'Atreides',
      UserSettings: {
        create: {
          favoriteStarWarsCharacterSwapiId: '32',
        },
      },
    },
  });

  const jessica = await prisma.user.upsert({
    where: { email: 'jessicaatreides@caladan.com' },
    update: {},
    create: {
      email: 'jessicaatreides@caladan.com',
      firstName: 'Jessica',
      lastName: 'Atreides',
      UserSettings: {
        create: {
          favoriteStarWarsCharacterSwapiId: '21',
        },
      },
    },
  });

  console.log('created paul', paul);
  console.log('created leto', leto);
  console.log('created jessica', jessica);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
