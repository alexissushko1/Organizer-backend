const prisma = require('../prisma');
const {faker} = require('@faker-js/faker');
const seed = async (numUsers = 5) => {
  const users = Array.from({length: numUsers}, () => ({
    username: faker.internet.username(),
    password: faker.internet.password(),
  }));
  const createdUsers = await prisma.user.createMany({data: users});
  const userIds = await prisma.user
    .findMany()
    .then((users) => users.map((user) => user.id));

  const myListsData = [
    {name: 'Fajitas', description: 'Soup'},
    {name: 'Pozole', description: 'Steak'},
    {name: 'Tacos', description: 'Chow'},
    {name: 'Puppy chow', description: 'Noodles'},
    {name: 'Clam chowder', description: 'Ramen'},
    {name: 'Chow mein', description: 'Soup'},
    {name: 'Cake', description: 'Soup'},
    {name: 'Gumbo', description: 'Soup'},
    {name: 'Açai bowl', description: 'Soup'},
    {name: 'Zuppa toscana', description: 'Soup'},
    {name: 'Pizza', description: 'Soup'},
  ];

  for (const myListData of myListsData) {
    const ownerId = userIds[Math.floor(Math.random() * userIds.length)];
    const myList = await prisma.myList.create({
      data: {
        ...myListData,
        owner: {connect: {id: ownerId}},
      },
    });

    const listItems = Array.from({length: 5}, () => ({
      itemName: faker.commerce.productName(),
      myListId: myList.id,
    }));
    await prisma.listItem.createMany({data: listItems});
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
