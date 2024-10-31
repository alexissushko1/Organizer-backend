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
    { name: "Clam chowder", description: "Soup" },
    { name: "Fajitas", description: "Steak" },
    { name: "Puppy chow", description: "Chow" },
    { name: "Chocolate chip cookies", description: "Noodles" },
    { name: "Apple pie", description: "Ramen" },
    { name: "Muddy buddies", description: "Soup" },
    { name: "Zuppa toscana", description: "Soup" },
    { name: "Gumbo", description: "Soup" },
    { name: "Lobster tail", description: "Soup" },
    { name: "Mac n' Cheese", description: "Soup" },
    { name: "Pozole", description: "Soup" },
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
