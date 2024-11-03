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
    {
      name: "Fajitas",
      description:
        "Flavorful grilled strips of marinated meat and colorful vegetables served with warm tortillas and your favorite toppings",
    },
    {
      name: "Pozole",
      description:
        "Traditional Mexican hominy stew with tender pork, rich broth, and garnished with fresh lime, cabbage, and radishes.",
    },
    {
      name: "Tacos",
      description:
        "Crispy or soft tortillas filled with seasoned meat or vegetables, topped with fresh salsa, cilantro, and a squeeze of lime.",
    },
    {
      name: "Puppy chow",
      description:
        "Sweet and crunchy snack mix made with cereal, peanut butter, chocolate, and powdered sugar.",
    },
    {
      name: "Clam chowder",
      description:
        "Creamy, hearty soup filled with tender clams, potatoes, and savory herbs.",
    },
    {
      name: "Chow mein",
      description:
        "Stir-fried noodles tossed with vegetables and your choice of protein, seasoned with a savory sauce.",
    },
    {
      name: "Chocolate Cake",
      description:
        "Moist, tender dessert with layers of fluffy sponge and rich frosting or fresh fillings.",
    },
    {
      name: "Gumbo",
      description:
        "Hearty Louisiana stew with a rich roux base, filled with seafood, sausage, or chicken, and served over rice.",
    },
    {
      name: "Açai bowl",
      description:
        "Refreshing and nutritious smoothie bowl made with blended açai berries and topped with granola, fresh fruit, and honey.",
    },
    {
      name: "Zuppa toscana",
      description:
        "Italian-inspired soup with creamy broth, tender potatoes, savory sausage, and fresh kale.",
    },
    {
      name: "Pizza",
      description:
        "Classic baked dish with a crispy crust topped with tomato sauce, melted cheese, and your choice of flavorful toppings.",
    },
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
      itemName: faker.food.ingredient(),
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
