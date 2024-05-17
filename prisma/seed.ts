import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const paul = await prisma.user.upsert({
    where: { id: "clwb7mw8300003z6kadi875xg" },
    update: {},
    create: {
      id: "clwb7mw8300003z6kadi875xg",
      email: "paulatreides@caladan.com",
      firstName: "Paul",
      lastName: "Atreides",
      UserSettings: {
        create: {
          favoriteStarWarsCharacterSwapiId: "11",
        },
      },
    },
  });

  const leto = await prisma.user.upsert({
    where: { id: "clwb7nckm00033z6kbm4nd22r" },
    update: {},
    create: {
      id: "clwb7nckm00033z6kbm4nd22r",
      email: "letoatreides@caladan.com",
      firstName: "Leto",
      lastName: "Atreides",
      UserSettings: {
        create: {
          favoriteStarWarsCharacterSwapiId: "32",
        },
      },
    },
  });

  const jessica = await prisma.user.upsert({
    where: { id: "clwb7nfxq00063z6k0acectsj" },
    update: {},
    create: {
      id: "clwb7nfxq00063z6k0acectsj",
      email: "jessicaatreides@caladan.com",
      firstName: "Jessica",
      lastName: "Atreides",
      UserSettings: {
        create: {
          favoriteStarWarsCharacterSwapiId: "21",
        },
      },
    },
  });

  console.log("created paul", paul);
  console.log("created leto", leto);
  console.log("created jessica", jessica);
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
