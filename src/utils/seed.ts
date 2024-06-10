import { PrismaClient, User } from "@prisma/client";
import { faker,simpleFaker } from "@faker-js/faker";

const prisma = new PrismaClient({
  log: ['query'],
});

async function main() {

  console.log('Seeding...');


  const amountOfUsers = 10;

  const users: User[] = [];


  for (let i = 0; i < amountOfUsers; i++) {
    
    const user: User = {
      id : simpleFaker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      role: i % 2 === 0 ? 'USER' : 'ADMIN',
      passwordHash: faker.internet.password(),
    };

    users.push(user);
  }

  console.log(users)

  await prisma.user.createMany({ data: users });

  console.log('Success')

  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });