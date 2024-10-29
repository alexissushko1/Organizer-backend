const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");
const seed = async (numUsers = 5) => {
  const users = Array.from({ length: numUsers }, () => ({
    username: faker.internet.username(),
    password: faker.internet.password(),
  }));
  const createdUsers = await prisma.user.createMany({ data: users });
  const userIds = await prisma.user
    .findMany()
    .then((users) => users.map((user) => user.id));

  const myListsData = [
    { name: "Recipe 1", description: "Soup" },
    { name: "Recipe 2", description: "Steak" },
    { name: "Recipe 3", description: "Chow" },
    { name: "Recipe 4", description: "Noodles" },
    { name: "Recipe 5", description: "Ramen" },
    { name: "Recipe 6", description: "Soup" },
    { name: "Recipe 7", description: "Soup" },
    { name: "Recipe 8", description: "Soup" },
    { name: "Recipe 9", description: "Soup" },
    { name: "Recipe 10", description: "Soup" },
    { name: "Recipe 11", description: "Soup" },
  ];

  for (const myListData of myListsData) {
    const ownerId = userIds[Math.floor(Math.random() * userIds.length)];
    const myList = await prisma.myList.create({
      data: {
        ...myListData,
        owner: { connect: { id: ownerId } },
      },
    });

    const listItems = Array.from({ length: 5 }, () => ({
      item: faker.commerce.productName(),
      myListId: myList.id,
    }));
    await prisma.listItem.createMany({ data: listItems });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
